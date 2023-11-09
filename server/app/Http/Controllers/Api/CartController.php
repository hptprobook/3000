<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function index()
    {
        try {
            $user = Auth::user();

            $cart = $user->cart;

            if (!$cart) {

                return response()->json(['message' => 'Cart empty'], 404);
            }
            $carts = Auth::user()->cart->cart_items()->with('product')->get();

            return response()->json(['message' => 'success', 'data' => $carts], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1,max:10000'
            ]);

            $product = Product::find($request->product_id);

            if (!$product) {
                return response()->json(['message' => 'Product not found'], 404);
            }

            $cart = Auth::user()->cart;

            if (!$cart) {
                $cart = Cart::create(['user_id' => Auth::id()]);
            }

            $carts = $cart->cart_items()->updateOrCreate(
                [
                    'product_id' => $product->id,
                    'quantity' => DB::raw("quantity + $request->quantity"),
                    'price' => $product->price
                ]
            );

            return response()->json(['message' => 'success', 'carts' => $carts], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $cart = CartItem::with('product')->findOrFail($id);

            return response()->json(['message' => 'success', 'data' => $cart], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $cartItem = CartItem::findOrFail($id);

            if (!$cartItem || $cartItem->cart->user_id !== Auth::id()) {
                return response()->json(['message' => 'Not found'], 404);
            }

            $request->validate([
                'quantity' => 'required|min:1|max:10000'
            ]);

            $cartItem->update($request->all());

            return response()->json(['message' => 'success', 'data' => $cartItem], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy(string $id)
    {
        try {
            $cartItem = CartItem::findOrFail($id);

            if (!$cartItem || $cartItem->cart->user_id !== Auth::id()) {
                return response()->json(['message' => 'Not found'], 404);
            }

            $cartItem->delete();

            return response()->json(['message' => 'Deleted success'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
