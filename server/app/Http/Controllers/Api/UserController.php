<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    private function validationRules($id = null)
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'required|string|min:6',
        ];
    }

    public function index()
    {
        if (auth()->guest()) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $users = User::with(['addresses', 'orders'])->get();
        return response()->json(['message' => 'success', 'data' => $users], 200);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Api does not exist'], 500);
    }

    public function show($id)
    {
        try {
            $user = User::with(['addresses', 'orders'])->findOrFail($id);
            return response()->json(['message' => 'success', 'data' => $user], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $request->validate(
                [
                    'name' => 'required|string|max:255',
                    'email' => 'string|email|max:255|unique:users,email,' . $id,
                    'role' => 'in:USER,ADMIN',
                    'phone_number' => 'min:9|max:10',
                    'gender' => 'in:male,female,other',
                    'birth_date' => 'date_format:Y/m/d'
                ]
            );

            $user = $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role ?? 'USER',
                'phone_number' => $request->phone_number,
                'gender' => $request->gender,
                'birth_date' => $request->birth_date,
            ]);

            return response()->json(['message' => 'success', 'data' => $user], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function updateCurrentUser(Request $request)
    {
        try {
            $user = Auth::user();

            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'string|email|max:255|unique:users,email,' . $user->id,
                'phone_number' => 'min:9|max:10',
                'gender' => 'in:male,female,other',
                'birth_date' => 'date_format:Y-m-d'
            ]);

            if ($request->has('password')) {
                $validatedData['password'] = Hash::make($request->password);
            }

            $user->fill($validatedData)->save();

            return response()->json(['message' => 'User profile updated successfully.', 'data' => $user], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation error.', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Server error.', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);

            if ($user->id == Auth::id()) {
                return response()->json(['message' => 'Can not delete this user'], 400);
            }

            $user->delete();

            return response()->json(['message' => 'Deleted successfully'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
