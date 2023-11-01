<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/changePassword', [AuthController::class, 'changePassword'])->middleware('auth:sanctum');

Route::apiResource('categories', CategoryController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
});
