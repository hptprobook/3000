<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Vanthao03596\HCVN\Models\District;
use Vanthao03596\HCVN\Models\Province;
use Vanthao03596\HCVN\Models\Ward;

class AddressController extends Controller
{

    public function index()
    {
        try {
            $user = Auth::user();
            $userId = $user->id;

            $addresses = Address::where('user_id', $userId)->with(['ward'])->get();

            return response()->json($addresses, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = Auth::user();

            if ($user->addresses()->count() >= 4) {
                return response()->json(['error' => 'Người dùng được tối đa 4 địa chỉ.'], Response::HTTP_BAD_REQUEST);
            }

            $request->validate([
                'name' => "required|string|min:3|max:100",
                'phone' => "required|string|min:8|max:10",
                'province_id' => "min:1|max:255",
                'district_id' => "min:1|max:255",
                'ward_id' => "required|integer",
                'address_info' => 'required|string|min:3|max:100',
            ]);

            $isFirstAddress = $user->addresses()->count() == 0;
            $isDefaultRequested = $request->input('is_default', false);
            $isDefault = $isDefaultRequested || $isFirstAddress;

            if ($isDefault) {
                $user->addresses()->update(['default' => 0]);
            }

            $address = Address::create([
                'user_id' => $user->id,
                'name' => $request->name,
                'phone' => $request->phone,
                'province_id' => $request->province_id,
                'district_id' => $request->district_id,
                'ward_id' => $request->ward_id,
                'address_info' => $request->address_info,
                'default' => $isDefault ? 1 : 0
            ]);

            DB::commit();
            return response()->json($address, Response::HTTP_OK);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $user = Auth::user();

            $request->validate([
                'name' => "sometimes|string|min:3|max:100",
                'phone' => "sometimes|string|min:8|max:10",
                'ward_id' => "sometimes",
                'district_id' => "sometimes",
                'province_id' => "sometimes",
                'address_info' => 'sometimes|string|min:3|max:100',
                'default' => 'sometimes|boolean',
            ]);

            $address = Address::find($id);

            if (!$address || $address->user_id !== $user->id) {
                return response()->json(['error' => 'Địa chỉ không tồn tại'], Response::HTTP_FORBIDDEN);
            }

            if ($request->has('default') && $request->default) {
                $user->addresses()->update(['default' => 0]);
                $address->default = 1;
            }

            $address->update($request->only(['name', 'phone', 'province_id', 'district_id', 'ward_id', 'address_info', 'default']));

            DB::commit();
            return response()->json($address, Response::HTTP_OK);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function getProvinces()
    {
        try {
            $provinces = Province::all();

            return response()->json($provinces, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getDistricts(string $id)
    {
        try {
            $province = Province::findOrFail($id);
            $districts = $province->districts;

            return response()->json($districts, Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getWards(string $id)
    {
        try {
            $district = District::findOrFail($id);
            $wards = $district->wards;

            return response()->json($wards, Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(string $id)
    {
        try {
            $address = Address::findOrFail($id);
            $address->delete();

            return response()->json(['success' => true], Response::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
