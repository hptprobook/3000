<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\VariantType;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class VariantTypesController extends Controller
{
    public function index()
    {
        try {
            $variantTypes = VariantType::all();

            return response()->json(['message' => 'success', 'data' => $variantTypes]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|min:3|max:100'
            ]);

            $variantTypes = VariantType::create($request->all());

            return response()->json(['message' => 'success', 'data' => $variantTypes], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $variantTypes = VariantType::findOrFail($id);

            return response()->json(['message' => 'success', 'data' => $variantTypes], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $variantTypes = VariantType::findOrFail($id);

            if ($variantTypes) {
                $request->validate(
                    [
                        'name' => 'required|min:3|max:128',
                    ]
                );

                $variantTypes = $variantTypes->update(
                    [
                        'name' => $request->name,
                    ]
                );

                return response()->json(['message' => 'Update variant type successfully', 'data' => $variantTypes], 200);
            } else {
                return response()->json(['message' => 'VariantType not found'], 403);
            }
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
            $variantTypes = VariantType::findOrFail($id);

            if ($variantTypes) {
                $variantTypes->delete();
                return response()->json(['message' => 'Variant type deleted successfully'], 200);
            } else {
                return response()->json(['message' => 'Variant type not found'], 403);
            }
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
