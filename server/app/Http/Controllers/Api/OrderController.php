<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Vanthao03596\HCVN\Models\Ward;

class OrderController extends Controller
{
    public function index()
    {
        try {
            $user = Auth::user();
            $orders = $user->orders;

            if (!$orders) {
                return response()->json(['message' => 'Orders is empty'], 404);
            }

            $user = Auth::user();
            $orders = $user->orders()->with(['order_details', 'address'])->get();

            return response()->json(['message' => 'success', 'data' => $orders], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = Auth::user();
            $total_amount = 0;

            $validatedData = $request->validate([
                'cart_item_ids' => 'array',
                'name' => 'required|string|min:3|max:50',
                'phone' => 'required|numeric|digits_between:9,11',
                'ward_id' => 'required|integer|min:1|max:30000',
                'street' => 'required|string|min:4|max:128',
                'note' => 'sometimes|nullable|string|max:1000',
                'order_type' => 'required|in:cart,direct'
            ]);

            $wardExists = Ward::where('id', $validatedData['ward_id'])->exists();
            if (!$wardExists) {
                return response()->json([
                    'message' => 'Order creation failed',
                    'error' => 'The provided ward_id does not exist in the database.'
                ], 422);
            }

            $address = Address::updateOrCreate(
                ['user_id' => $user->id, 'ward_id' => $validatedData['ward_id']],
                ['name' => $validatedData['name'], 'phone' => $validatedData['phone'], 'address_info' => $validatedData['street'], 'note' => $validatedData['note']]
            );

            if ($validatedData['order_type'] == 'cart') {
                $cartItems = CartItem::whereIn('id', $validatedData['cart_item_ids'])->get();
                $total_amount = $cartItems->sum('price');

                $order = Order::create([
                    'user_id' => $user->id,
                    'total_amount' => $total_amount,
                    'address_id' => $address->id,
                    'status' => 'pending',
                    'note' => $validatedData['note'],
                ]);

                foreach ($cartItems as $cartItem) {
                    $order->order_details()->create([
                        'product_id' => $cartItem->product_id,
                        'quantity' => $cartItem->quantity,
                        'discount' => $cartItem->discount ?? 0,
                    ]);
                    $cartItem->delete();
                }
            } else {
                $order = Order::create([
                    'user_id' => $user->id,
                    'total_amount' => $total_amount,
                    'address_id' => $address->id,
                    'status' => 'pending',
                ]);

                $productDetail = $request->validate([
                    'product_id' => 'required|integer',
                    'quantity' => 'required|integer|min:1',
                ]);

                $product = Product::find($productDetail['product_id']);
                $total_amount = $product->price * $productDetail['quantity'];

                $order->order_details()->create([
                    'product_id' => $product->id,
                    'quantity' => $productDetail['quantity'],
                    'discount' => 0,
                ]);
            }



            DB::commit();
            return response()->json(['message' => 'Order successfully created', 'data' => $order->load('order_details')], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Order creation failed', 'error' => $e->getMessage()], 500);
        }
    }


    public function show(string $id)
    {
        try {
            $order = Auth::user()->orders()->with(['order_details', 'address'])->findOrFail($id);

            if (!$order) {
                return response()->json(['message' => 'Order not found'], 404);
            }

            return response()->json(['message' => 'success', 'data' => $order], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
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

            $order = $user->orders()->findOrFail($id);

            DB::commit();

            return response()->json(['message' => 'Order status updated successfully', 'data' => $order], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Order status update failed', 'error' => $e->getMessage()], 500);
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

            return response()->json(['message' => 'Order and order details successfully deleted'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to delete order', 'error' => $e->getMessage()], 500);
        }
    }
}
