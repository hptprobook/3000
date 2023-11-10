<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class TagController extends Controller
{
    public function index()
    {
        try {
            $tags = Tag::all();

            return response()->json($tags, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|unique:tags|max:255',
                'description' => 'sometimes|string',
            ]);

            $tag = Tag::create($request->all());

            return response()->json($tag, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function show($id)
    {
        try {
            $tag = Tag::findOrFail($id);

            return response()->json($tag, Response::HTTP_OK);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
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

            return response()->json($tag, Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        try {
            $tag = Tag::findOrFail($id);
            $tag->delete();
            return response()->json(['success' => true], Response::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
