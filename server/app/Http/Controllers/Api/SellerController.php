<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Seller;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Vanthao03596\HCVN\Models\Ward;

class SellerController extends Controller
{
    public function index()
    {
        try {
            $sellers = Seller::with(['addresses'])->get();

            return response()->json($sellers, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            $validatedData = $request->validate(
                [
                    'name' => 'required|min:3|max:128',
                    'email' => 'required|min:3|max:255|email|unique:sellers',
                    'phone_number' => 'required|min:5|max:11',
                    'ward_id' => 'integer|between:0,50000',
                    'street' => 'required|min:3|max:100'
                ]
            );

            $wardExists = Ward::where('id', $validatedData['ward_id'])->exists();
            if (!$wardExists) {
                return response()->json([
                    'error' => 'The provided ward_id does not exist in the database.'
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            };

            $address = Address::updateOrCreate(
                ['user_id' => $user->id, 'ward_id' => $validatedData['ward_id']],
                ['name' => $validatedData['name'], 'phone' => $validatedData['phone_number'], 'address_info' => $validatedData['street']]
            );

            $seller = Seller::create([
                'user_id' => $user->id,
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'phone_number' => $validatedData['phone_number'],
                'address_id' => $address->id
            ]);

            $user->role = 'SELLER';
            $user->save();

            return response()->json($seller, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(string $id)
    {
        try {
            $seller = Seller::with(['addresses.ward'])->findOrFail($id);

            return response()->json($seller, Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $user = Auth::user();

            $validatedData = $request->validate(
                [
                    'name' => 'required|min:3|max:128',
                    'email' => 'required|min:3|max:255|email|unique:sellers,email,' . $id,
                    'phone_number' => 'required|min:5|max:11',
                    'ward_id' => 'integer|between:0,50000',
                    'street' => 'required|min:3|max:100'
                ]
            );

            $seller = Seller::findOrFail($id);
            $wardExists = Ward::where('id', $validatedData['ward_id'])->exists();

            if (!$wardExists) {
                return response()->json([
                    'error' => 'The provided ward_id does not exist in the database.'
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            };

            $address = Address::find($seller->address_id);
            $address->ward_id = $validatedData['ward_id'];
            $address->save();

            $seller = $seller->update([
                'user_id' => $user->id,
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'phone_number' => $validatedData['phone_number'],
                'address_id' => $address->id
            ]);

            $user->role = 'SELLER';
            $user->save();
            DB::commit();

            return response()->json($seller, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(string $id)
    {
        try {
            $seller = Seller::findOrFail($id);
            $seller->delete();

            return response()->json(['success' => true], Response::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
