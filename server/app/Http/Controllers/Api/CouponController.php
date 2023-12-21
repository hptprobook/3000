<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class CouponController extends Controller
{
    public function index()
    {
        try {
            $coupons = Coupon::all();

            return response()->json($coupons, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
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
                    'amount' => 'required|numeric',
                    'quantity' => 'required|numeric|between:0,1000',
                    'type' => 'required|string|in:percent,direct,ship'
                ]
            );

            $coupon = Coupon::create($request->all());

            return response()->json($coupon, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(string $id)
    {
        try {
            $coupon = Coupon::findOrFail($id);

            return response()->json($coupon, Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
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
                    'amount' => 'required|numeric',
                    'quantity' => 'required|numeric|between:0,1000',
                    'type' => 'required|in:percent,direct,ship'
                ]
            );

            $coupon = $coupon->update($request->all());

            return response()->json($coupon, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(string $id)
    {
        try {
            $coupon = Coupon::findOrFail($id);

            $coupon->delete();

            return response()->json(['success' => true], Response::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
