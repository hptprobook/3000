<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $brand = Brand::findOrFail($id);

            return response()->json(['message' => "success", 'data' => $brand], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $brand = Brand::findOrFail($id);

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
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy(string $id)
    {
        try {
            $brand = Brand::findOrFail($id);

            $brand->delete();
            return response()->json(['message' => 'Brand deleted successfully'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
