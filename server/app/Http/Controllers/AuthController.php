<?php

namespace App\Http\Controllers;

use App\Mail\PasswordResetMail;
use App\Models\Cart;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
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
            $user = User::where($loginField, $request->login)->first();

            if (!$user) {
                return response()->json(['error' => 'Email or phone does not exist.'], Response::HTTP_BAD_REQUEST);
            }

            if (!Hash::check($request->password, $user->password)) {
                return response()->json(['error' => 'Password is incorrect.'], Response::HTTP_BAD_REQUEST);
            }

            $token = $user->createToken('access_token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
            ], Response::HTTP_OK);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->validator->errors()], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function isAdmin(Request $request)
    {
        try {
            $user = Auth::user();
            if ($user['role'] == 'ADMIN' && $user['status'] == 'active') {
                return true;
            } else {
                return  'false';
            }
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|min:5|max:50',
                'email' => 'required_without:email|unique:users,email',
                'password' => 'required'
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
            ]);

            Cart::create(['user_id' => $user->id]);

            return response()->json($user, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->validator->errors()], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $token = rand(100000, 999999); // Tạo mã số 6 chữ số

        // Lưu token vào database
        DB::table('password_reset_tokens')->insert([
            'email' => $request->email,
            'token' => $token,
            'created_at' => now()
        ]);

        // Gửi mail
        Mail::to($request->email)->send(new PasswordResetMail($token));

        return response()->json(['message' => 'success'], 200);
    }

    public function verifyToken(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
        ]);

        $tokenData = DB::table('password_reset_tokens')
            ->where('token', $request->token)
            ->where('email', $request->email)
            ->first();

        if (!$tokenData) {
            return response()->json(['message' => 'Token không hợp lệ hoặc đã hết hạn.'], 400);
        }

        return response()->json(['message' => 'success']);
    }

    public function resetPassword(Request $request)
    {
        $tokenData = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        $user = User::where('email', $tokenData->email)->firstOrFail();
        $user->password = Hash::make($request->password);
        $user->save();

        DB::table('password_reset_tokens')->where('email', $user->email)->delete();

        return response()->json(['message' => 'success']);
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
                return response()->json(['error' => 'The provided password does not match your current password.'], Response::HTTP_BAD_REQUEST);
            }

            $user->password = Hash::make($validatedData['newPassword']);
            $user->save();

            return response()->json(['message' => 'Password changed successfully'], Response::HTTP_OK);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->validator->errors()], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
