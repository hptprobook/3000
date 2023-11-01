<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\brand;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;


class BrandController extends Controller
{
    public function index()
    {
        try {
            $brands = brand::all();

            return response()->json(['success' => true, 'data' => $brands], 200);
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

            $brand = brand::create(
                [
                    'name' => $request->name,
                    'icon_url' => $request->icon_url
                ]
            );

            return response()->json(['message' => 'Create brand successfully', 'brand' => $brand], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        }
    }

    public function show(string $id)
    {
        try {
            $brand = brand::find($id);

            return response()->json(['success' => true, 'brand' => $brand], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $brand = brand::find($id);

            if ($brand) {
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

                return response()->json(['message' => 'Update brand successfully', 'category' => $brand], 200);
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
            $brand = brand::find($id);

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
