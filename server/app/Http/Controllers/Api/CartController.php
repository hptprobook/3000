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
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

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

            return response()->json($carts, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'product_id' => 'required|exists:products,id',
                'temp_price' => 'required',
                'quantity' => 'required|integer|min:1|max:1000',
                'variants' => 'string|max:255'
            ]);

            $product = Product::findOrFail($request->product_id);
            $cart = Auth::user()->cart;

            if (!$cart) {
                $cart = Cart::create(['user_id' => Auth::id()]);
            }

            $newVariants = json_decode($request->variants, true);
            sort($newVariants);

            $cartItem = $cart->cart_items()->where('product_id', $product->id)->get()->filter(function ($item) use ($newVariants) {
                $itemVariants = json_decode($item->variants, true);
                sort($itemVariants);
                return $newVariants == $itemVariants;
            })->first();

            if ($cartItem) {
                $cartItem->quantity += $request->quantity;
                $cartItem->save();
            } else {
                $cartItem = $cart->cart_items()->create([
                    'product_id' => $product->id,
                    'quantity' => $request->quantity,
                    'price' => $request->temp_price,
                    'variants' => json_encode($newVariants)
                ]);
            }

            if ($product->quantity < $request->quantity) {
                throw new Exception('Sản phẩm không đủ số lượng');
            }

            $product->decrement('quantity', $request->quantity);

            return response()->json($cartItem, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function show(string $id)
    {
        try {
            $cart = CartItem::with('product')->findOrFail($id);

            return response()->json($cart, Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getCartsWithIds(Request $request)
    {
        try {
            $cartItemIds = $request->input('cart_item_ids', []);

            if (empty($cartItemIds)) {
                return response()->json(['message' => 'No cart item IDs provided'], Response::HTTP_BAD_REQUEST);
            }

            $cartItems = CartItem::with('product')
                ->whereIn('id', $cartItemIds)
                ->get();

            return response()->json($cartItems, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }



    public function update(Request $request, string $id)
    {
        try {
            $cartItem = CartItem::findOrFail($id);

            if (!$cartItem || $cartItem->cart->user_id !== Auth::id()) {
                return response()->json(['error' => 'Not found'], Response::HTTP_NOT_FOUND);
            }

            $request->validate([
                'quantity' => 'required|min:1|max:10000'
            ]);

            $cartItem = $cartItem->update($request->all());

            return response()->json($cartItem, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateCart(Request $request)
    {
        $items = $request->cartItems;
        $updatedItems = [];
        $errors = [];

        if ($items) {
            foreach ($items as $item) {
                try {

                    $cartItem = CartItem::findOrFail($item['id']);

                    if ($cartItem->cart->user_id !== Auth::id()) {
                        throw new Exception('Not authorized to update this item.');
                    }

                    $cartItem->update(['quantity' => $item['quantity']]);
                    $updatedItems[] = $cartItem;
                } catch (ValidationException $e) {
                    $errors[] = ['id' => $item['id'], 'error' => 'Validation error', 'message' => $e->getMessage()];
                } catch (ModelNotFoundException $e) {
                    $errors[] = ['id' => $item['id'], 'error' => 'Not found', 'message' => $e->getMessage()];
                } catch (Exception $e) {
                    $errors[] = ['id' => $item['id'], 'error' => 'Error', 'message' => $e->getMessage()];
                }
            }

            return response()->json([
                'updated' => $updatedItems,
                'errors' => $errors
            ], Response::HTTP_OK);
        } else {
            return response()->json(['errors' => "Dữ liệu không hợp lệ"], Response::HTTP_BAD_REQUEST);
        }
    }

    public function destroy(string $id)
    {
        try {
            $cartItem = CartItem::findOrFail($id);

            if (!$cartItem || $cartItem->cart->user_id !== Auth::id()) {
                return response()->json(['error' => 'Not found'], Response::HTTP_NOT_FOUND);
            }

            $cartItem->product->increment('quantity', $cartItem->quantity);

            $cartItem->delete();

            return response()->json(['success' => true], Response::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
