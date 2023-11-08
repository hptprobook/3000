<?php

use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\CouponUsageController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderDetailController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VariantTypesController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/changePassword', [AuthController::class, 'changePassword'])->middleware('auth:sanctum');



Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);

    Route::apiResource('addresses', AddressController::class);

    Route::apiResource('brands', BrandController::class);

    Route::apiResource('categories', CategoryController::class);

    Route::apiResource('variant_types', VariantTypesController::class);

    Route::apiResource('products', ProductController::class);

    Route::apiResource('reviews', ReviewController::class);

    Route::apiResource('carts', CartController::class);

    Route::apiResource('orders', OrderController::class);

    Route::apiResource('order_details', OrderDetailController::class);

    Route::apiResource('coupons', CouponController::class);

    Route::apiResource('coupon_usages', CouponUsageController::class);

    Route::apiResource('posts', PostController::class);
});
