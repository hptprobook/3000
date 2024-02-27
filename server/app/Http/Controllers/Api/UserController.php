<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Vanthao03596\HCVN\Models\Ward;

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
        try {
            $users = User::with(['addresses', 'orders'])->get();

            return response()->json($users, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        return response()->json(['error' => 'Api does not exist'], Response::HTTP_NOT_FOUND);
    }

    public function getCurrentUser()
    {
        try {
            $user = Auth::user();
            return response()->json($user, Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        try {
            $user = User::with(['addresses', 'orders'])->findOrFail($id);

            return response()->json($user, Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $request->validate([
                'name' => 'sometimes|string|max:255',
                'phone_number' => 'sometimes|min:9|max:10|unique:users,phone_number,' . $user->id,
                'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
                'password' => 'sometimes|string|min:6',
                'role' => 'sometimes|in:USER,ADMIN,SELLER',
                // 'gender' => 'sometimes|in:male,female,other',
                'birth_date' => 'sometimes|date_format:Y-m-d'
            ]);

            $updateData = [
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role,
                'phone_number' => $request->phone_number,
                'gender' => $request->gender,
                'birth_date' => $request->birth_date,
            ];

            if (!empty($request->password)) {
                $updateData['password'] = Hash::make($request->password);
            }

            $user->update($updateData);

            $user = $user->fresh();

            return response()->json($user, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateCurrentUser(Request $request)
    {
        try {
            $user = Auth::user();

            $request->validate([
                'name' => 'sometimes|string|max:255',
                'phone_number' => 'sometimes|min:9|max:10|unique:users,phone_number,' . $user->id,
                'gender' => 'sometimes|in:male,female,other',
                'birth_date' => 'sometimes|date_format:Y-m-d'
            ]);

            $user = $user->update([
                'name' => $request->name,
                'phone_number' => $request->phone_number,
                'gender' => $request->gender,
                'birth_date' => $request->birth_date,
            ]);

            return response()->json($user, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateToAdmin($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->update(['role' => 'ADMIN']);
            $user->assignRole('ADMIN');

            return response()->json($user, Response::HTTP_CREATED);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);

            if ($user->id == Auth::id()) {
                return response()->json(['error' => 'Can not delete this user'], Response::HTTP_BAD_REQUEST);
            }

            $user->delete();

            return response()->json(['success' => true], Response::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
