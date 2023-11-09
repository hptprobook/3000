<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

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
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|min:5|max:50',
                'email' => 'required|nullable|email|unique:users',
                'phone_number' => 'required|nullable|unique:users',
                'password' => 'required',
                'confirmPassword' => 'required|same:password',
            ]);

            if (!$request->email && !$request->phone_number) {
                $validator = Validator::make([], []);
                $validator->errors()->add('email', 'Email or phone number is required.');
                $validator->errors()->add('phone_number', 'Email or phone number is required.');
                throw new ValidationException($validator);
            }

            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'phone_number' => $request->input('phone_number'),
                'password' => Hash::make($request->input('password')),
            ]);

            $user->assignRole('USER');

            return response()->json(['message' => 'success', 'data' => $user], 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }



    public function changePassword(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'currentPassword' => 'required',
                'newPassword' => 'required|min:6|max:50',
                'confirmPassword' => 'required|same:newPassword',
            ]);

            $user = Auth::user();

            if (!Hash::check($validatedData['currentPassword'], $user->password)) {
                return response()->json(['error' => 'The provided password does not match your current password.'], 422);
            }

            $user->password = Hash::make($validatedData['newPassword']);
            $user->save();

            return response()->json(['message' => 'Password changed successfully'], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
