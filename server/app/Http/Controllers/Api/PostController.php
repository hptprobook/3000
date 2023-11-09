<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PostController extends Controller
{
    public function index()
    {
        try {
            $posts = Post::all();
            return response()->json($posts, 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $post = Post::findOrFail($id);

            return response()->json($post, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|max:255',
                'content' => 'required',
                'author' => 'required',
                'tags' => 'required',
                'img' => 'required',
                'status' => 'required',
            ]);

            $post = Post::create($validatedData);

            return response()->json(['message' => 'Post created successfully', 'data' => $post], 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $post = Post::findOrFail($id);

            if (!$post) {
                return response()->json(['message' => 'Post not found'], 404);
            }

            $validatedData = $request->validate([
                'title' => 'required|max:255',
                'content' => 'required',
                'author' => 'required',
                'tags' => 'required',
                'img' => 'required',
                'status' => 'required',
            ]);

            $post->update($validatedData);

            return response()->json(['message' => 'Post updated successfully', 'data' => $post], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }


    public function destroy($id)
    {
        try {
            $post = Post::find($id);

            $post->delete();

            return response()->json(['message' => 'Post deleted successfully'], 204);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
