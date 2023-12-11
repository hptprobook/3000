<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;


class BrandController extends Controller
{
    public function index()
    {
        try {
            $brands = Brand::all();

            return response()->json($brands, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function topBrand()
    {
        try {
            $sortedBrands = Brand::with(['products.reviews'])->get()->map(function ($brand) {
                $brand->products->each(function ($product) {
                    $product->average_rating = $product->reviews->avg('rating') ?: 0;
                });

                return [
                    'brand' => $brand,
                    'total_sold' => $brand->products->sum('sold'),
                ];
            })->sortByDesc('total_sold')->take(5);

            $brands = $sortedBrands->pluck('brand');

            return response()->json($brands, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }



    public function store(Request $request)
    {
        try {
            $request->validate(
                [
                    'name' => 'required|min:3|max:128',
                    'icon_url' => 'required|max:255'
                ]
            );

            $brand = Brand::create(
                [
                    'name' => $request->name,
                    'icon_url' => $request->icon_url
                ]
            );

            return response()->json($brand, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(string $id)
    {
        try {
            $brand = Brand::findOrFail($id);

            return response()->json($brand, Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $brand = Brand::findOrFail($id);

            $request->validate(
                [
                    'name' => 'required|min:3|max:128',
                    'icon_url' => 'required|max:255'
                ]
            );

            $brand = $brand->update(
                [
                    'name' => $request->name,
                    'icon_url' => $request->icon_url
                ]
            );

            return response()->json($brand, Response::HTTP_CREATED);
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
            $brand = Brand::findOrFail($id);

            $brand->delete();
            return response()->json(Response::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
