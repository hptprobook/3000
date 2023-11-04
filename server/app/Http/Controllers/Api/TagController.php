<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::all();

        return response()->json(['success' => true, 'data' => $tags], 200);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|unique:tags|max:255',
                'description' => 'sometimes|string',
            ]);

            $tag = Tag::create($request->all());

            return response()->json(['data' => $tag, 'message' => 'Tag created successfully'], 201);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function show($id)
    {
        try {
            $tag = Tag::findOrFail($id);
            return response()->json(['data' => $tag, 'message' => 'success'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Tag not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $tag = Tag::findOrFail($id);

            $request->validate([
                'name' => 'required|unique:tags|max:255',
                'description' => 'sometimes|string',
            ]);

            $tag = $tag->update($request->all());

            return response()->json(['data' => $tag, 'message' => 'Tag created successfully'], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Tag not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $tag = Tag::findOrFail($id);
            $tag->delete();
            return response()->json(['message' => 'Tag deleted successfully'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Tag not found'], 404);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
