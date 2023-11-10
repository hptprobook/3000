<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Models\CouponUsage;
use App\Models\Order;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class CouponUsageController extends Controller
{
    // Hàm kiểm tra discount_type
    private function calculateDiscount($total, $discountString)
    {
        if (str_ends_with($discountString, '%')) {
            $percentage = rtrim($discountString, '%');
            return ($total * $percentage) / 100;
        }

        if (str_ends_with(strtolower($discountString), 'vnd')) {
            $amount = rtrim($discountString, ' vndVND');
            return min($total, $amount);
        }

        return 0;
    }

    public function index()
    {
        try {
            $couponUsages = CouponUsage::with(['user', 'coupon', 'order'])->get();

            return response()->json($couponUsages, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        try {
            $user_id = Auth::id();

            $request->validate([
                'code' => 'required|string',
                'order_id' => 'required|integer|exists:orders,id'
            ]);

            $code = $request->input('code');
            $coupon = Coupon::where('code', $code)->first();

            if ($coupon->quantity <= 0) {
                return response()->json(['error' => 'This coupon is no longer available.'], Response::HTTP_BAD_REQUEST);
            }

            if (!$coupon) {
                return response()->json(['error' => 'Invalid coupon code.'], Response::HTTP_BAD_REQUEST);
            }

            $existingUsage = CouponUsage::where('coupon_id', $coupon->id)
                ->where('order_id', $request->order_id)
                ->exists();
            if ($existingUsage) {
                return response()->json(['error' => 'This coupon has already been used for this order.'], Response::HTTP_BAD_REQUEST);
            }

            $order = Order::find($request->order_id);
            $discountValue = $this->calculateDiscount($order->total_amount, $coupon->amount);

            $order->total_amount -= $discountValue;
            $order->save();

            $coupon->quantity -= 1;
            $coupon->save();

            $coupon_usage = CouponUsage::create([
                'user_id' => $user_id,
                'order_id' => $request->order_id,
                'coupon_id' => $coupon->id,
            ]);

            return response()->json($coupon_usage, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(string $id)
    {
        return response()->json(['error' => 'Api does not exist.'], Response::HTTP_NOT_FOUND);
    }

    public function update(Request $request, string $id)
    {
        return response()->json(['error' => 'Api does not exist.'], Response::HTTP_NOT_FOUND);
    }

    public function destroy(string $id)
    {
        return response()->json(['error' => 'Api does not exist.'], Response::HTTP_NOT_FOUND);
    }
}
