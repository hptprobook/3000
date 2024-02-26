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
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\SellerController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VariantTypesController;
use App\Http\Controllers\Api\VnpayController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Auth
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/changePassword', [AuthController::class, 'changePassword'])->middleware('auth:sanctum');
Route::post('/auth/password/forgot', [AuthController::class, 'forgotPassword'])->name('password.forgot');
Route::post('/auth/password/verifyToken', [AuthController::class, 'verifyToken']);
Route::post('/auth/password/resetPassword', [AuthController::class, 'resetPassword']);

// VNPAY
Route::post('/order/vnpay', [VnpayController::class, 'create']);
Route::get('/order/vnpay/return', [VnpayController::class, 'return']);

// Search
Route::get('/search/{searchValue?}', [SearchController::class, 'search']);
Route::get('/search/save_hot_search', [SearchController::class, 'saveHotSearch']);

// Product
Route::get('/products/recommended', [ProductController::class, 'withReview']);
Route::apiResource('products', ProductController::class)->only(['index', 'show']);

// Brand
Route::get('/brands/top-brands', [BrandController::class, 'topBrand']);
Route::apiResource('brands', BrandController::class)->only(['index', 'show', 'topBrand']);

// Category
Route::get('/categories/recommended', [CategoryController::class, 'recommended']);
Route::get('/categories/best-seller', [CategoryController::class, 'bestSeller']);
Route::get('/categories/main', [CategoryController::class, 'mainCategories']);
Route::get('/categories/getProductByCatId/{id}', [CategoryController::class, 'getProductByCatId']);
Route::apiResource('categories', CategoryController::class)->only(['index', 'show', 'bestSeller', 'mainCategories', 'getProductById']);

// Setting
Route::apiResource('settings', SettingController::class)->only(['index', 'show']);

Route::apiResource('tags', TagController::class);

// Middleware
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/addresses/getProvinces', [AddressController::class, 'getProvinces']);
    Route::get('/addresses/getDistricts/{id}', [AddressController::class, 'getDistricts']);
    Route::get('/addresses/getWards/{id}', [AddressController::class, 'getWards']);
    Route::get('/addresses/getProvinceGHN', [AddressController::class, 'getProvincesByGHN']);

    Route::get('users/current_user', [UserController::class, 'getCurrentUser']);
    Route::put('users/updateCurrentUser', [UserController::class, 'updateCurrentUser']);
    Route::put('users/update', [UserController::class, 'update']);
    Route::apiResource('users', UserController::class);
    Route::get('/is_admin', [AuthController::class, 'isAdmin']);

    Route::apiResource('addresses', AddressController::class);

    Route::apiResource('brands', BrandController::class)->except(['index', 'show', 'topBrand']);

    Route::apiResource('categories', CategoryController::class)->except(['index', 'show', 'mainCategories', 'bestSeller', 'recommended', 'getProductById']);

    Route::apiResource('variant_types', VariantTypesController::class);

    Route::apiResource('products', ProductController::class)->except(['index', 'show']);

    Route::apiResource('reviews', ReviewController::class);


    Route::post('carts/ids', [CartController::class, 'updateCart']);
    Route::apiResource('carts', CartController::class);

    Route::post('/carts/get_cart_with_ids', [CartController::class, 'getCartsWithIds']);

    Route::get("/orders/get_all", [OrderController::class, 'getAll']);

    Route::apiResource('orders', OrderController::class);

    Route::get("/orders/get_detail/{id}", [OrderController::class, 'showNotAuth']);
    Route::put("/orders/update_order/{id}", [OrderController::class, 'updateNotAuth']);


    Route::apiResource('order_details', OrderDetailController::class);

    Route::apiResource('coupons', CouponController::class);

    Route::post('/coupons/check', [CouponUsageController::class, 'checkCoupon']);

    Route::apiResource('coupon_usages', CouponUsageController::class);

    Route::apiResource('sellers', SellerController::class);

    Route::apiResource('posts', PostController::class);

    Route::apiResource('settings', SettingController::class)->except(['index', 'show']);



    // Report
    Route::get("/dashboard/report", [ReportController::class, 'reportDashboard']);
    Route::post("/report/chart/order", [ReportController::class, "getOrderReportToChart"]);
    Route::post("/report/chart/amount", [ReportController::class, "getAmountReportToChart"]);
});
