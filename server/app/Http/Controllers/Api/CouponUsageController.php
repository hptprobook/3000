<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Models\CouponUsage;
use App\Models\Order;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
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

            return response()->json(['message' => 'success', 'data' => $couponUsages], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
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
                return response()->json(['message' => 'This coupon is no longer available.'], 400);
            }

            if (!$coupon) {
                return response()->json(['message' => 'Invalid coupon code.'], 404);
            }

            $existingUsage = CouponUsage::where('coupon_id', $coupon->id)
                ->where('order_id', $request->order_id)
                ->exists();
            if ($existingUsage) {
                return response()->json(['message' => 'This coupon has already been used for this order.'], 400);
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

            return response()->json(['message' => 'Coupon applied successfully.', 'data' => $coupon_usage], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error.', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Server error.', 'error' => $e->getMessage()], 500);
        }
    }

    public function show(string $id)
    {
        return response()->json(['message' => 'Api does not exist.'], 500);
    }

    public function update(Request $request, string $id)
    {
        return response()->json(['message' => 'Api does not exist.'], 500);
    }

    public function destroy(string $id)
    {
        return response()->json(['message' => 'Api does not exist.'], 500);
    }
}
