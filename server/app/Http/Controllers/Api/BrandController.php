<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;


class BrandController extends Controller
{
    public function index()
    {
        try {
            $brands = Brand::all();

            return response()->json(['message' => "success", 'data' => $brands], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
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
                    'icon_url' => 'required|max:255'
                ]
            );

            $brand = Brand::create(
                [
                    'name' => $request->name,
                    'parent_id' => $parent_id,
                    'icon_url' => $request->icon_url
                ]
            );

            return response()->json(['message' => 'Create brand successfully', 'data' => $brand], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        }
    }

    public function show(string $id)
    {
        try {
            $brand = Brand::find($id);

            if ($brand) {
                return response()->json(['message' => "success", 'data' => $brand], 200);
            } else {
                return response()->json(['error' => 'Brand not found'], 422);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $brand = Brand::find($id);

            if ($brand) {
                $parent_id = $request->parent_id ?? null;
                $request->validate(
                    [
                        'name' => 'required|min:3|max:128',
                        'parent_id' => 'max:10',
                        'icon_url' => 'required|max:255'
                    ]
                );

                $brand = $brand->update(
                    [
                        'name' => $request->name,
                        'parent_id' => $parent_id,
                        'icon_url' => $request->icon_url
                    ]
                );

                return response()->json(['message' => 'Update brand successfully', 'data' => $brand], 200);
            } else {
                return response()->json(['message' => 'Brand not found'], 403);
            }
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy(string $id)
    {
        try {
            $brand = Brand::find($id);

            if ($brand) {
                $brand->delete();
                return response()->json(['message' => 'Brand deleted successfully'], 200);
            } else {
                return response()->json(['message' => 'Brand not found'], 403);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
