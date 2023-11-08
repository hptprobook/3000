<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Exception;
use Illuminate\Http\Request;

class AddressController extends Controller
{

    public function index()
    {
        try {
            $addresses = Address::all();
            return response()->json(['message' => 'success', 'addresses' => $addresses], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'user_id' => 'required',
                'name' => 'required|string|min:3|max:50',
                'phone' => 'required|string|min:9|max:10',
                'ward_id' => 'required|exists:wards,id',
                'address_info' => 'required|string',
                'note' => 'sometimes|string|nullable',
            ]);

            $address = Address::create($validatedData);

            return response()->json(['message' => 'Address created successfully', 'address' => $address], 201);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $address = Address::findOrFail($id);
            return response()->json(['message' => 'success', 'address' => $address], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $address = Address::findOrFail($id);

            $validatedData = $request->validate([
                'user_id' => 'required',
                'name' => 'required|string|min:3|max:50',
                'phone' => 'required|string|min:9|max:10',
                'ward_id' => 'required|exists:wards,id',
                'address_info' => 'required|string',
                'note' => 'sometimes|string|nullable',
            ]);

            $address->update($validatedData);

            return response()->json(['message' => 'Address updated successfully', 'address' => $address], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy(string $id)
    {
        try {
            $address = Address::findOrFail($id);
            $address->delete();

            return response()->json(['message' => 'Address deleted successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
