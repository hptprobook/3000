<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{

    public function index()
    {
        $reviews = Review::with(['user', 'product'])->get();

        return response()->json(['message' => 'success', 'data' => $reviews], 200);
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'product_id' => 'required|numeric|between:0,20000',
                'rating' => 'required|numeric|between:1,5',
                'comment' => 'required|string|min:10|max:720'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $user_id = Auth::id();

            $reviewData = $request->only(['product_id', 'rating', 'comment']) + ['user_id' => $user_id];

            $review = Review::create($reviewData);

            return response()->json(['message' => 'Review created successfully', 'data' => $review], 200);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], 500);
        }
    }



    public function show($id)
    {
        try {
            $review = Review::with(['user', 'product'])->findOrFail($id);

            return response()->json(['message' => 'success', 'data' => $review], 200);
        } catch (Exception $e) {
            return response()->json(['errors' => 'Review not found or an error occurred', 'message' => $e->getMessage()], 404);
        }
    }


    public function update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'product_id' => 'required|numeric|between:0,20000',
                'rating' => 'required|numeric|between:1,5',
                'comment' => 'required|string|min:10|max:720'
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $review = Review::findOrFail($id);

            if (Auth::id() !== $review->user_id && !Auth::user()->isAdmin()) {
                return response()->json(['errors' => 'Unauthorized'], 403);
            }

            $review->update($request->all());

            return response()->json(['message' => 'Review updated successfully', 'data' => $review], 200);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], 500);
        }
    }


    public function destroy($id)
    {
        try {
            $review = Review::findOrFail($id);

            if (Auth::id() !== $review->user_id && !Auth::user()->isAdmin()) {
                return response()->json(['errors' => 'Unauthorized'], 403);
            }

            $review->delete();

            return response()->json(['message' => 'Review deleted successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['errors' => 'Review not found or an error occurred', 'message' => $e->getMessage()], 404);
        }
    }
}
