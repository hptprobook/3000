<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('brand')->get();

        return response()->json(['success' => true, 'products' => $products], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|min:3|max:128',
                'price' => 'required|numeric|between:1000,1000000000',
                'discount' => 'required|numeric|between:0,100',
                'short_desc' => 'required|string|min:10|max:512',
                'detail' => 'required|min:12|max:18000',
                'thumbnail' => 'required|min:3|max:255',
                'category_id' => 'required',
                'brand_id' => 'required'
            ]);

            $product = Product::create($request->only([
                'name', 'price', 'discount', 'short_desc', 'detail', 'thumbnail'
            ]));

            $product->categories()->attach($request->input('category_id', []));
            $product->brands()->attach($request->input('brand_id', []));

            return response()->json(['success' => 'true', 'product' => $product], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::with(['categories', 'brands'])->find($id);

        if (!$product) {
            return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
        }

        return response()->json(['product' => $product], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
