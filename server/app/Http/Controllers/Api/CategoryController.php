<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CategoryController extends Controller
{
    public function index()
    {
        try {
            $categories = Category::all();

            return response()->json(['message' => "success", 'data' => $categories], 200);
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

            $category = Category::create(
                [
                    'name' => $request->name,
                    'parent_id' => $parent_id,
                    'icon_url' => $request->icon_url
                ]
            );

            return response()->json(['message' => 'Create category successfully', 'data' => $category], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $category = Category::findOrFail($id);

            return response()->json(['message' => "success", 'data' => $category], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
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
                    'icon_url' => 'max:255'
                ]
            );

            $category = $category->update(
                [
                    'name' => $request->name,
                    'parent_id' => $parent_id,
                    'icon_url' => $request->icon_url
                ]
            );

            return response()->json(['message' => 'Update category successfully', 'data' => $category], 200);
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
            $category = Category::findOrFail($id);

            $category->delete();
            return response()->json(['message' => 'Category deleted successfully'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
