<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CouponController extends Controller
{
    public function index()
    {
        try {
            $coupons = Coupon::all();

            return response()->json(['message' => 'success', 'data' => $coupons], 200);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate(
                [
                    'code' => 'required|min:3|max:20|string|unique:coupons',
                    'description' => 'required|min:3|max:128|string',
                    'start_date' => 'required|date_format:Y/m/d',
                    'end_date' => 'required|date_format:Y/m/d|after:start_date',
                    'amount' => 'required|string|min:2|max:36',
                    'quantity' => 'required|numeric|between:0,1000'
                ]
            );

            $coupon = Coupon::create($request->all());

            return response()->json(['message' => 'success', 'data' => $coupon], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $coupon = Coupon::findOrFail($id);

            return response()->json(['message' => 'success', 'data' => $coupon], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $coupon = Coupon::findOrFail($id);

            $request->validate(
                [
                    'code' => 'required|min:3|max:20|string|unique:coupons,code,' . $id,
                    'description' => 'required|min:3|max:128|string',
                    'start_date' => 'required|date_format:Y/m/d',
                    'end_date' => 'required|date_format:Y/m/d|after:start_date',
                    'amount' => 'required|string|min:2|max:36',
                    'quantity' => 'required|numeric|between:0,1000'
                ]
            );

            $coupon->update($request->all());

            return response()->json(['message' => 'success', 'data' => $coupon], 201);
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
            $coupon = Coupon::findOrFail($id);

            $coupon->delete();

            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
