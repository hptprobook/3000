<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate([
                'login' => 'required',
                'password' => 'required',
            ]);

            $loginField = filter_var($request->login, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone_number';

            if (Auth::attempt([$loginField => $request->login, 'password' => $request->password])) {
                $user = Auth::user();
                $token = $user->createToken('access_token')->plainTextToken;

                return response()->json([
                    'user' => $user,
                    'token' => $token,
                ]);
            } else {
                return response()->json(['error' => 'Email, phone_number or password is incorect'], 401);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|min:5|max:50',
                'email' => 'nullable|email|unique:users',
                'phone_number' => 'nullable|unique:users',
                'password' => 'required',
                'confirmPassword' => 'required|same:password',
            ]);

            if (!$request->email && !$request->phone_number) {
                $validator = Validator::make([], []);
                $validator->errors()->add('email', 'Email or phone number is required.');
                $validator->errors()->add('phone_number', 'Email or phone number is required.');
                throw new \Illuminate\Validation\ValidationException($validator);
            }

            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'phone_number' => $request->input('phone_number'),
                'password' => Hash::make($request->input('password')),
            ]);

            return response()->json(['message' => 'success', 'data' => $user], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }



    public function changePassword(Request $request)
    {
        try {
            $request->validate([
                'currentPassword' => 'required',
                'newPassword' => "required|min:6|max:50",
                'confirmPassword' => 'required|same:newPassword',
            ]);

            $user = Auth::user();

            if (!Hash::check($request->currentPassword, $user->password)) {
                return response()->json(['error' => 'Current password is incorrect'], 400);
            }

            $user->password = Hash::make($request->newPassword);
            $user->save();

            return response()->json(['message' => 'Password updated successfully']);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }
}
