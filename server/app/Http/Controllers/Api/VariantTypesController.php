<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\VariantType;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class VariantTypesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $variantTypes = VariantType::all();

        return response()->json(['success' => true, 'variant_types' => $variantTypes]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|min:3|max:100'
            ]);

            $variantTypes = VariantType::create($request->all());

            return response()->json(['success' => true, 'variant_types' => $variantTypes], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $variantTypes = VariantType::find($id);

            return response()->json(['success' => true, 'variant_types' => $variantTypes], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $variantTypes = VariantType::find($id);

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

                return response()->json(['message' => 'Update variant type successfully', 'variant_types' => $variantTypes], 200);
            } else {
                return response()->json(['message' => 'VariantType not found'], 403);
            }
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $variantTypes = VariantType::find($id);

            if ($variantTypes) {
                $variantTypes->delete();
                return response()->json(['message' => 'Variant type deleted successfully'], 200);
            } else {
                return response()->json(['message' => 'Variant type not found'], 403);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
