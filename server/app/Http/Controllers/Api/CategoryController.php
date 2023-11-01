<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CategoryController extends Controller
{
    public function index()
    {
        try {
            $categories = Category::all();

            return response()->json(['success' => true, 'data' => $categories], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
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

            $category = Category::create(
                [
                    'name' => $request->name,
                    'icon_url' => $request->icon_url
                ]
            );

            return response()->json(['message' => 'Create category successfully', 'category' => $category], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        }
    }

    public function show(string $id)
    {
        try {
            $category = Category::find($id);

            return response()->json(['success' => true, 'category' => $category], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $category = Category::find($id);

            if ($category) {
                $request->validate(
                    [
                        'name' => 'required|min:3|max:128',
                        'icon_url' => 'required|max:255'
                    ]
                );

                $category = $category->update(
                    [
                        'name' => $request->name,
                        'icon_url' => $request->icon_url
                    ]
                );

                return response()->json(['message' => 'Update category successfully', 'category' => $category], 200);
            } else {
                return response()->json(['message' => 'Category not found'], 403);
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
            $category = Category::find($id);

            if ($category) {
                $category->delete();
                return response()->json(['message' => 'Category deleted successfully'], 200);
            } else {
                return response()->json(['message' => 'Category not found'], 403);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
