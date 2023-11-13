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
        return 'haha';
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

    public function store(Request $request)
    {
        try {
            $searchTerm = $request->input('searchTerm');

            $products = Product::where('name', 'like', "%$searchTerm%")->get();
            $tags = Tag::where('name', 'like', "%$searchTerm%")->get();
            $brands = Brand::where('name', 'like', "%$searchTerm%")->get();
            $categories = Category::where('name', 'like', "%$searchTerm%")->get();

            $results = [
                'products' => $products,
                'tags' => $tags,
                'brands' => $brands,
                'categories' => $categories,
            ];

            return response()->json($results, Response::HTTP_OK);
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
