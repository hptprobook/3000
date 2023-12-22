<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class CategoryController extends Controller
{
    public function index()
    {
        try {
            $categories = Category::all();

            return response()->json($categories, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function mainCategories()
    {
        try {
            $mainCategories = Category::where('parent_id', 0)->get();

            return response()->json($mainCategories, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getProductByCatId(string $id)
    {
        try {
            $categories = Category::where('id', $id)->orWhere('parent_id', $id)->get();

            $products = collect();

            foreach ($categories as $category) {
                $category->products->each(function ($product) {
                    $product->average_rating = $product->reviews->avg('rating') ?: 0;
                });

                $products = $products->merge($category->products);
            }

            return response()->json($products, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function bestSeller()
    {
        try {
            $sortedCategories = Category::with(['products.reviews'])->get()->map(function ($category) {
                // Tính toán đánh giá trung bình cho mỗi sản phẩm
                $category->products->each(function ($product) {
                    $product->average_rating = $product->reviews->avg('rating') ?: 0;
                });

                return [
                    'category' => $category,
                    'total_sold' => $category->products->sum('sold'),
                ];
            })->sortByDesc('total_sold')->take(5);

            $categories = $sortedCategories->pluck('category');

            return response()->json($categories, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function recommended()
    {
        try {
            $sortedCategories = Category::with(['products.reviews'])->get()->map(function ($category) {
                $category->products->each(function ($product) {
                    $product->average_rating = $product->reviews->avg('rating') ?: 0;
                });

                $category->average_rating = $category->products->avg('average_rating') ?: 0;

                return [
                    'category' => $category
                ];
            })->sortByDesc('average_rating')->take(5);

            $categories = $sortedCategories->pluck('category');

            return response()->json($categories, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }



    public function store(Request $request)
    {
        try {
            $parent_id = $request->parent_id ?? null;

            $request->validate(
                [
                    'name' => 'required|min:3|max:128',
                    'parent_id' => 'max:10',
                    'icon_url' => 'required|max:512'
                ]
            );

            $category = Category::create(
                [
                    'name' => $request->name,
                    'parent_id' => $parent_id,
                    'icon_url' => $request->icon_url
                ]
            );

            return response()->json($category, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(string $id)
    {
        try {
            $category = Category::findOrFail($id);

            return response()->json($category, Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $category = Category::findOrFail($id);

            $parent_id = $request->parent_id ?? null;

            $request->validate(
                [
                    'name' => 'min:3|max:128',
                    'parent_id' => 'max:10',
                    'icon_url' => 'max:512'
                ]
            );

            $category = $category->update(
                [
                    'name' => $request->name,
                    'parent_id' => $parent_id,
                    'icon_url' => $request->icon_url
                ]
            );

            return response()->json($category, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(string $id)
    {
        try {
            $category = Category::findOrFail($id);

            $category->delete();
            return response()->json(['success' => true], Response::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
