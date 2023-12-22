<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductTag;
use App\Models\Tag;
use App\Models\VariantType;
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
                'short_desc' => 'required|string|min:10|max:1024',
                'detail' => 'required|min:12|max:100000',
                'thumbnail' => 'required|min:3|max:1024',
                'category_id' => 'required|integer|exists:categories,id',
                'images' => 'required|array',
                'images.*' => 'string|min:3|max:512',
                'tags.*' => 'string|min:1|max:128',
                'quantity' => 'required|integer',
                'brand_id' => 'integer',
                'variants' => 'sometimes|array',
                'variants.*.name' => 'required_with:variants|string',
                'variants.*.value' => 'required_with:variants',
                'variants.*.price' => 'required_with:variants|numeric',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], Response::HTTP_BAD_REQUEST);
            }

            $data = $request->only([
                'name', 'price', 'discount', 'short_desc', 'detail', 'thumbnail', 'category_id', 'status', 'brand_id', 'weight', 'length', 'width', 'height'
            ]);

            if ($request->has('quantity')) {
                $data['quantity'] = $request->quantity;
            }

            $product = Product::create($data);

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

            foreach ($request->variants as $variant) {
                $variantType = VariantType::firstOrCreate(['name' => $variant['name']]);
                $product->variants()->attach($variantType->id, [
                    'value' => $variant['value'],
                    'price' => $variant['price']
                ]);
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
            $product = Product::with(['category.products', 'images', 'reviews.user', 'variants', 'seller'])
                ->findOrFail($id);

            $averageRating = $product->reviews->avg('rating') ?? 0;

            $groupedVariants = $product->variants->groupBy('name')->map(function ($variantGroup, $variantTypeName) {
                return [
                    'variantType' => $variantTypeName,
                    'options' => $variantGroup->map(function ($variant) {
                        return [
                            'name' => $variant->pivot->value,
                            'price' => $variant->pivot->price ?? null
                        ];
                    })
                ];
            })->values();

            $productResource = $product->toArray();
            $productResource['average_rating'] = $averageRating;
            $productResource['variants'] = $groupedVariants;

            $productResource['reviews'] = ReviewResource::collection($product->reviews);

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
                'name' => 'sometimes|min:3|max:128',
                'price' => 'sometimes|numeric|between:1000,1000000000',
                'discount' => 'sometimes|numeric|between:0,100',
                'short_desc' => 'sometimes|string|min:10|max:1024',
                'detail' => 'sometimes|min:12|max:100000',
                'thumbnail' => 'sometimes|min:3|max:512',
                'category_id' => 'sometimes',
                'images' => 'sometimes|array',
                'images.*' => 'string|min:3|max:512',
                'tags' => 'sometimes|string',
                'brand_id' => 'integer',
                'status' => 'sometimes',
                'quantity' => 'sometimes|numeric|between:0,10000',
                'variants' => 'sometimes|array',
                'variants.*.name' => 'sometimes|required_with:variants|string',
                'variants.*.value' => 'sometimes|required_with:variants',
                'variants.*.price' => 'sometimes|required_with:variants|numeric',
            ]);

            $product->update($request->only([
                'name', 'price', 'discount', 'short_desc', 'detail', 'thumbnail', 'category_id', 'status', 'quantity', 'brand_id', 'weight', 'length', 'width', 'height'
            ]));

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

            if ($request->has('variants')) {
                foreach ($request->variants as $variant) {
                    $variantType = VariantType::firstOrCreate(['name' => $variant['name']]);

                    $existingVariant = $product->variants()->where('variant_type_id', $variantType->id)->first();
                    if ($existingVariant) {
                        $product->variants()->updateExistingPivot($variantType->id, [
                            'value' => $variant['value'],
                            'price' => $variant['price']
                        ]);
                    } else {
                        $product->variants()->attach($variantType->id, [
                            'value' => $variant['value'],
                            'price' => $variant['price']
                        ]);
                    }
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
