<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\HotSearch;
use App\Models\Product;
use App\Models\Tag;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class SearchController extends Controller
{
    public function saveHotSearch(Request $request)
    {
        try {
            $searchTerm = $request->input("searchTerm");

            $hotSearch = HotSearch::where('keywords', $searchTerm)->first();

            if ($hotSearch) {
                $hotSearch->count += 1;
                $hotSearch->save();
            } else {
                HotSearch::create([
                    'keywords' => $searchTerm,
                    'count' => 1,
                ]);
            }

            return response()->json(['message' => 'Hot search saved successfully'], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function search($searchValue = "")
    {
        try {
            // Collect IDs of brands, tags, and categories matching the search value
            $brandIds = Brand::where('name', 'like', "%$searchValue%")->pluck('id');
            $tagIds = Tag::where('name', 'like', "%$searchValue%")->pluck('id');
            $categoryIds = Category::where('name', 'like', "%$searchValue%")->pluck('id');

            // Query for products
            $products = Product::query()
                ->where(function ($query) use ($searchValue, $brandIds, $tagIds, $categoryIds) {
                    $query->where('name', 'like', "%$searchValue%")
                        ->orWhere('short_desc', 'like', "%$searchValue%")
                        ->orWhereHas('brand', function ($q) use ($brandIds) {
                            $q->whereIn('id', $brandIds);
                        })
                        ->orWhereHas('tags', function ($q) use ($tagIds) {
                            $q->whereIn('id', $tagIds);
                        })
                        ->orWhereHas('category', function ($q) use ($categoryIds) {
                            $q->whereIn('id', $categoryIds);
                        });
                })
                // Add an order clause that prioritizes name and short_desc matches
                ->orderByRaw("CASE WHEN name LIKE '%$searchValue%' THEN 0 WHEN short_desc LIKE '%$searchValue%' THEN 1 ELSE 2 END")
                ->get();

            return response()->json($products, Response::HTTP_OK);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }



    public function show(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
