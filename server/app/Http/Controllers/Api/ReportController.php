<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    function reportDashboard()
    {
        $orderSuccessCount = Order::where("status", "delivered")->count();
        $orderCancelledCount = Order::where("status", "cancelled")->count();
        $orderTotalAmount = Order::where('status', 'delivered')->sum('total_amount');
        $orderPendingCount = Order::where("status", "pending")->count();

        $data = [
            "orderSuccessCount" => $orderSuccessCount,
            "orderCancelledCount" => $orderCancelledCount,
            "orderTotalAmount" => $orderTotalAmount,
            "orderPendingCount" => $orderPendingCount
        ];

        return response()->json($data, 200);
    }

    public function getOrderReportToChart(Request $request)
    {
        $period = $request->period; // Lấy tham số period từ request
        $now = now();

        switch ($period) {
            case "monthly":
                $months = collect();
                for ($i = 5; $i >= 0; $i--) {
                    $months->push([
                        'year' => $now->copy()->subMonths($i)->format('Y'),
                        'month' => $now->copy()->subMonths($i)->format('n'),
                        'deliveredCount' => 0,
                        'cancelledCount' => 0,
                    ]);
                }

                // Truy vấn dữ liệu từ cơ sở dữ liệu
                $deliveredOrders = Order::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as count')
                    ->where('status', 'delivered')
                    ->where('created_at', '>=', $now->copy()->subMonths(6)->startOfMonth())
                    ->groupBy('year', 'month')
                    ->get()
                    ->keyBy(function ($item) {
                        return $item['year'] . '-' . $item['month'];
                    });

                $cancelledOrders = Order::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as count')
                    ->where('status', 'cancelled')
                    ->where('created_at', '>=', $now->copy()->subMonths(6)->startOfMonth())
                    ->groupBy('year', 'month')
                    ->get()
                    ->keyBy(function ($item) {
                        return $item['year'] . '-' . $item['month'];
                    });

                // Điền dữ liệu vào $months, $quarters, hoặc $years
                $ordersFilled = $months->map(function ($timeUnit) use ($deliveredOrders, $cancelledOrders) {
                    $key = $timeUnit['year'] . '-' . ($timeUnit['month'] ?? $timeUnit['quarter'] ?? '');
                    $timeUnit['deliveredCount'] = $deliveredOrders->has($key) ? $deliveredOrders->get($key)->count : 0;
                    $timeUnit['cancelledCount'] = $cancelledOrders->has($key) ? $cancelledOrders->get($key)->count : 0;
                    return $timeUnit;
                });
                break;

            case "quarterly":
                $quarters = collect();
                for ($i = 3; $i >= 0; $i--) {
                    $quarter = $now->copy()->subQuarters($i);
                    $quarters->push([
                        'year' => $quarter->format('Y'),
                        'quarter' => ceil($quarter->format('n') / 3),
                        'deliveredCount' => 0,
                        'cancelledCount' => 0,
                    ]);
                }
                // Truy vấn dữ liệu từ cơ sở dữ liệu
                $deliveredOrders = Order::selectRaw('YEAR(created_at) as year, QUARTER(created_at) as quarter, COUNT(*) as count')
                    ->where('status', 'delivered')
                    ->where('created_at', '>=', $now->copy()->subMonths(6)->startOfMonth())
                    ->groupBy('year', 'quarter')
                    ->get()
                    ->keyBy(function ($item) {
                        return $item['year'] . '-' . $item['quarter']; // Sửa ở đây
                    });

                $cancelledOrders = Order::selectRaw('YEAR(created_at) as year, QUARTER(created_at) as quarter, COUNT(*) as count')
                    ->where('status', 'cancelled')
                    ->groupBy('year', 'quarter')
                    ->get()
                    ->keyBy(function ($item) {
                        return $item['year'] . '-' . $item['quarter'];
                    });

                // Điền dữ liệu vào $quarters
                $ordersFilled = $quarters->map(function ($quarter) use ($deliveredOrders, $cancelledOrders) {
                    $key = $quarter['year'] . '-' . $quarter['quarter'];
                    $quarter['deliveredCount'] = $deliveredOrders->has($key) ? $deliveredOrders->get($key)->count : 0;
                    $quarter['cancelledCount'] = $cancelledOrders->has($key) ? $cancelledOrders->get($key)->count : 0;
                    return $quarter;
                });
                break;

            case "yearly":
                $years = collect();
                for ($i = 4; $i >= 0; $i--) {
                    $years->push([
                        'year' => $now->copy()->subYears($i)->format('Y'),
                        'deliveredCount' => 0, // Số lượng đơn hàng đã giao
                        'cancelledCount' => 0, // Số lượng đơn hàng đã hủy
                    ]);
                }

                // Truy vấn đơn hàng đã giao
                $deliveredOrders = Order::selectRaw('YEAR(created_at) as year, COUNT(*) as count')
                    ->where('status', 'delivered')
                    // Bạn có thể cần xem xét lại điều kiện này nếu muốn dữ liệu cho 5 năm, không chỉ 6 tháng gần nhất
                    ->where('created_at', '>=', $now->copy()->subYears(5)->startOfYear())
                    ->groupBy('year')
                    ->get()
                    ->keyBy(function ($item) {
                        return $item['year'];
                    });

                // Truy vấn đơn hàng đã hủy
                $cancelledOrders = Order::selectRaw('YEAR(created_at) as year, COUNT(*) as count')
                    ->where('status', 'cancelled')
                    ->where('created_at', '>=', $now->copy()->subYears(5)->startOfYear())
                    ->groupBy('year')
                    ->get()
                    ->keyBy(function ($item) {
                        return $item['year'];
                    });

                // Điền dữ liệu vào $years
                $ordersFilled = $years->map(function ($year) use ($deliveredOrders, $cancelledOrders) {
                    $key = $year['year'];
                    $year['deliveredCount'] = $deliveredOrders->has($key) ? $deliveredOrders->get($key)->count : 0;
                    $year['cancelledCount'] = $cancelledOrders->has($key) ? $cancelledOrders->get($key)->count : 0;
                    return $year;
                });

                break;
        }

        return response()->json($ordersFilled, 200);
    }



    public function getAmountReportToChart(Request $request)
    {
        $period = $request->period;
        $now = now();

        $result = collect();

        switch ($period) {
            case "monthly":
                for ($i = 5; $i >= 0; $i--) {
                    $date = $now->copy()->subMonths($i);
                    $year = $date->format('Y');
                    $month = $date->format('n');

                    // Truy vấn tổng số tiền cho mỗi tháng
                    $totalDelivered = Order::where('status', 'delivered')
                        ->whereYear('created_at', $year)
                        ->whereMonth('created_at', $month)
                        ->sum('total_amount');

                    // Tạo doanh thu dự kiến (fake)
                    $expectedRevenue = rand(5000000, 20000000); // Sử dụng số ngẫu nhiên hoặc logic phù hợp

                    $result->push([
                        'year' => $year,
                        'month' => $month,
                        'totalDelivered' => $totalDelivered,
                        'expectedRevenue' => $expectedRevenue,
                    ]);
                }
                break;

            case "quarterly":
                for ($i = 3; $i >= 0; $i--) {
                    $quarter = ceil(($now->copy()->subQuarters($i)->month) / 3);
                    $year = $now->copy()->subQuarters($i)->year;

                    // Tương tự, truy vấn tổng số tiền và tạo doanh thu dự kiến cho mỗi quý
                    $totalDelivered = Order::where('status', 'delivered')
                        ->where(DB::raw('YEAR(created_at)'), $year)
                        ->where(DB::raw('QUARTER(created_at)'), $quarter)
                        ->sum('total_amount');

                    $expectedRevenue = rand(100000000, 300000000); // Số ngẫu nhiên cho ví dụ

                    $result->push([
                        'year' => $year,
                        'quarter' => $quarter,
                        'totalDelivered' => $totalDelivered,
                        'expectedRevenue' => $expectedRevenue,
                    ]);
                }
                break;

            case "yearly":
                for ($i = 4; $i >= 0; $i--) {
                    $year = $now->copy()->subYears($i)->year;

                    // Tương tự, truy vấn tổng số tiền và tạo doanh thu dự kiến cho mỗi năm
                    $totalDelivered = Order::where('status', 'delivered')
                        ->whereYear('created_at', $year)
                        ->sum('total_amount');

                    $expectedRevenue = rand(500000000, 1000000000); // Số ngẫu nhiên cho ví dụ

                    $result->push([
                        'year' => $year,
                        'totalDelivered' => $totalDelivered,
                        'expectedRevenue' => $expectedRevenue,
                    ]);
                }
                break;
        }

        return response()->json($result, 200);
    }
}
