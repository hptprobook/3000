<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
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

        $users = User::with('addresses')->get();
        return response()->json(['message' => 'success', 'data' => $users], 200);
    }

    public function store(Request $request)
    {
        $request->validate($this->validationRules());

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'USER'
        ]);

        return response()->json(['message' => 'success', 'data' => $user], 201);
    }

    public function show(User $user)
    {
        return response()->json(['message' => 'success', 'data' => $user], 200);
    }

    public function update(Request $request, User $user)
    {
        $request->validate($this->validationRules($user->id));

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'USER'
        ]);

        return response()->json(['message' => 'success', 'data' => $user], 200);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'success'], 204);
    }
}
