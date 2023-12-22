<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Coupon;
use App\Models\CouponUsage;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        try {
            $user = Auth::user();
            $orders = $user->orders()->with(['order_details.product', 'address'])
                ->orderBy('created_at', 'desc')
                ->get();

            if ($orders->isEmpty()) {
                return response()->json(['error' => 'Orders are empty'], Response::HTTP_NOT_FOUND);
            }

            return response()->json($orders, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getAll()
    {
        try {
            $orders = Order::with(['order_details.product', 'address'])
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($orders, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = Auth::user();

            $validatedData = $request->validate([
                'cart_item_ids' => 'required|array',
                'address_id' => 'required',
                'note' => 'string',
                'total_amount' => 'required|numeric',
                'ship_fee' => 'required|numeric',
                'discount' => 'numeric|nullable',
                'code' => 'string|nullable',
            ]);

            $cartItems = CartItem::whereIn('id', $validatedData['cart_item_ids'])->get();

            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $request->total_amount,
                'status' => 'pending',
                'address_id' => $request->address_id,
                'note' => $request->note,
                'discount' => $request->discount,
                'ship_fee' => $request->ship_fee
            ]);

            foreach ($cartItems as $cartItem) {
                $order->order_details()->create([
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'discount' => $cartItem->discount ?? 0,
                    'variants' => $cartItem->variants,
                    'price' => $cartItem->price
                ]);

                $cartItem->delete();
            }

            if (!empty($validatedData['code']) || $validatedData['code'] != null) {
                $coupon = Coupon::where('code', $validatedData['code'])->firstOrFail();
                $coupon->quantity -= 1;
                $coupon->save();

                CouponUsage::create([
                    'user_id' => $user->id,
                    'coupon_id' => $coupon->id,
                    'order_id' => $order->id
                ]);
            }

            DB::commit();
            return response()->json($order->load('order_details'), Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function show(string $id)
    {
        try {
            $order = Auth::user()->orders()->with(['order_details.product', 'address'])->findOrFail($id);

            return response()->json($order, Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function showNotAuth(string $id)
    {
        try {
            $order = Order::with(['order_details.product', 'address',])->findOrFail($id);
            return response()->json($order, Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $user = Auth::user();
            $order = $user->orders()->findOrFail($id);

            $request->validate([
                'status' => 'required|string|in:pending,processing,shipping,delivered,cancelled,refunded'
            ]);

            $order = $order->update(['status' => $request->status]);

            $order = $user->orders()->with('order_details')->findOrFail($id);

            if ($request->status == 'delivered') {
                foreach ($order->order_details as $detail) {
                    $product = Product::find($detail->product_id);
                    $product->sold += $detail->quantity;
                    $product->save();
                }
            }

            DB::commit();

            return response()->json($order, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateNotAuth(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $order = Order::findOrFail($id);

            $request->validate([
                'status' => 'required|string|in:pending,processing,shipping,delivered,cancelled,refunded'
            ]);

            $order = $order->update(['status' => $request->status]);

            $order = Order::findOrFail($id);

            DB::commit();

            return response()->json($order, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $user = Auth::user();
            $order = $user->orders()->with('order_details')->findOrFail($id);

            foreach ($order->order_details as $detail) {
                $detail->delete();
            }

            $order->delete();

            DB::commit();

            return response()->json(['success' => true], Response::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
