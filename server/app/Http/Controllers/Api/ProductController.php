<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductTag;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['brands', 'category', 'tags', 'images', 'reviews'])->get();

        return response()->json(['success' => true, 'products' => $products], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|min:3|max:128',
                'price' => 'required|numeric|between:1000,1000000000',
                'discount' => 'required|numeric|between:0,100',
                'short_desc' => 'required|string|min:10|max:512',
                'detail' => 'required|min:12|max:18000',
                'thumbnail' => 'required|min:3|max:255',
                'category_id' => 'required',
                'images' => 'required|array',
                'images.*' => 'string|min:3|max:255',
                'tags' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $product = Product::create($request->only([
                'name', 'price', 'discount', 'short_desc', 'detail', 'thumbnail', 'category_id'
            ]));

            if ($request->has('brand_ids') && is_array($request->brand_ids)) {
                $product->brands()->attach($request->brand_ids);
            }

            foreach ($request->images as $image_url) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => $image_url,
                    'image_alt' => $request->image_alt ?? null
                ]);
            }

            $tags = explode('|', $request->tags);
            foreach ($tags as $tag_name) {
                ProductTag::create([
                    'product_id' => $product->id,
                    'name' => $tag_name
                ]);
            }

            DB::commit();

            return response()->json(['success' => 'true', 'product' => $product], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show(string $id)
    {
        $product = Product::with(['category', 'brands', 'images', 'tags', 'reviews'])->findOrFail($id);

        return response()->json(['product' => $product], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();

        try {
            $product = Product::findOrFail($id);

            $request->validate([
                'name' => 'required|min:3|max:128',
                'price' => 'required|numeric|between:1000,1000000000',
                'discount' => 'required|numeric|between:0,100',
                'short_desc' => 'required|string|min:10|max:512',
                'detail' => 'required|min:12|max:18000',
                'thumbnail' => 'required|min:3|max:255',
                'category_id' => 'required',
                'images' => 'sometimes|array',
                'images.*' => 'string|min:3|max:255',
                'tags' => 'sometimes|string'
            ]);

            $product->update($request->only([
                'name', 'price', 'discount', 'short_desc', 'detail', 'thumbnail', 'category_id'
            ]));

            if ($request->has('brand_ids') && is_array($request->brand_ids)) {
                $product->brands()->sync($request->brand_ids);
            }

            if ($request->has('images')) {
                $product->images()->delete();

                foreach ($request->images as $image_url) {
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_url' => $image_url,
                        'image_alt' => 'Alt text'
                    ]);
                }
            }

            if ($request->has('tags')) {
                $product->tags()->delete();

                $tags = explode('|', $request->tags);
                foreach ($tags as $tag_name) {
                    ProductTag::create([
                        'product_id' => $product->id,
                        'name' => $tag_name
                    ]);
                }
            }

            DB::commit();

            return response()->json(['success' => 'true', 'product' => $product->fresh()], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();

        try {
            $product = Product::with(['images', 'tags', 'reviews'])->findOrFail($id);

            foreach ($product->images as $image) {
                $image->delete();
            }

            foreach ($product->tags as $tag) {
                $tag->delete();
            }

            $product->delete();

            DB::commit();

            return response()->json(['success' => 'true', 'message' => 'Product and related data deleted successfully.'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
