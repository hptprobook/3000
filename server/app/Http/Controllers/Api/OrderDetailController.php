<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderDetail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderDetailController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Api does not exist!'], 404);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Api does not exist!'], 404);
    }

    public function show(string $id)
    {
        try {
            $order_details = OrderDetail::with(['product'])->findOrFail($id);

            if (!$order_details) {
                return response()->json(['message' => 'Order detail not found!'], 404);
            }

            return response()->json(['message' => 'success', 'data' => $order_details], 201);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        return response()->json(['message' => 'Api does not exist!'], 404);
    }

    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $orderDetail = OrderDetail::findOrFail($id);
            $order = $orderDetail->order;
            $orderId = $order->id;

            $orderDetail->delete();

            $newTotalAmount = OrderDetail::where('order_id', $orderId)
                ->join('products', 'order_details.product_id', '=', 'products.id')
                ->sum(DB::raw('order_details.quantity * products.price'));

            $order->total_amount = $newTotalAmount;
            $order->save();

            DB::commit();

            return response()->json(['message' => 'Order detail and order total amount updated successfully'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to delete order detail', 'error' => $e->getMessage()], 500);
        }
    }
}
