<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductTag;
use App\Models\Tag;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{

    public function index()
    {
        try {
            $products = Product::with(['reviews', 'images'])
                ->withCount(['reviews as average_rating' => function ($query) {
                    $query->select(DB::raw('coalesce(avg(rating),0)'));
                }])
                ->get();

            $products->each(function ($product) {
                $product->average_rating = (float) $product->average_rating;
            });

            return response()->json($products, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function withReview()
    {
        try {
            $products = Product::with(['reviews', 'images', 'category'])
                ->withCount(['reviews as average_rating' => function ($query) {
                    $query->select(DB::raw('coalesce(avg(rating),0)'));
                }])
                ->orderBy('average_rating', 'desc')
                ->get();

            return response()->json($products, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


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
                'category_id' => 'required|integer|exists:categories,id',
                'images' => 'required|array',
                'images.*' => 'string|min:3|max:255',
                'tags.*' => 'string|min:1|max:128',
                'quantity' => 'required|integer'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], Response::HTTP_BAD_REQUEST);
            }

            $data = $request->only([
                'name', 'price', 'discount', 'short_desc', 'detail', 'thumbnail', 'category_id', 'status',
            ]);

            if ($request->has('quantity')) {
                $data['quantity'] = $request->quantity;
            }

            $product = Product::create($data);

            if ($request->has('brand_ids') && is_array($request->brand_ids)) {
                $product->brands()->attach($request->brand_ids);
            }

            foreach ($request->images as $image_url) {
                $product->images()->create([
                    'image_url' => $image_url,
                    'image_alt' => $request->image_alt ?? null
                ]);
            }

            $tags = explode('|', $request->tags);
            foreach ($tags as $tagName) {
                $tag = Tag::firstOrCreate(['name' => $tagName]);

                $product->tags()->attach($tag->id);
            }

            DB::commit();

            return response()->json($product, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(string $id)
    {
        try {
            $product = Product::with(['category', 'brands', 'images', 'tags', 'reviews', 'variants.variantType'])
                ->findOrFail($id);

            $averageRating = $product->reviews->avg('rating') ?? 'Chưa có đánh giá';

            $groupedVariants = $product->variants->groupBy('variantType.name')->map(function ($variantGroup, $variantTypeName) {
                return [
                    'variantType' => $variantTypeName,
                    'options' => $variantGroup->map(function ($variant) {
                        return [
                            'id' => $variant->id,
                            'name' => $variant->value,
                            'price' => $variant->price ?? null
                        ];
                    })
                ];
            })->values();

            $productResource = $product->toArray();
            $productResource['average_rating'] = $averageRating;
            $productResource['variants'] = $groupedVariants;

            return response()->json($productResource, Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

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
                'tags' => 'sometimes|string',
                'status' => 'required',
                'quantity' => 'required|numeric|between:0,10000'
            ]);

            $product->update($request->only([
                'name', 'price', 'discount', 'short_desc', 'detail', 'thumbnail', 'category_id', 'status', 'quantity'
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

            return response()->json($product->fresh(), Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

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

            return response()->json(['success' => true], Response::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
