<?php

use Illuminate\Support\Facades\Route;

// Public routes
Route::namespace('App\Http\Controllers\Api')
  ->group(function () {
    Route::post('/signup', 'AuthController@signup');
    Route::post('/login', 'AuthController@login');
    Route::post('/adLogin', 'AuthController@adminLogin');
    Route::get('/products', 'ProductController@getAll');
    Route::post('/forget', 'AuthController@forget');
    Route::post('/reset', 'AuthController@reset');
  });

// Customer routes
Route::middleware(['auth:sanctum', 'verify'])
  ->namespace('App\Http\Controllers\Api')
  ->group(function () {
    Route::get('/logout', 'AuthController@logout');
    Route::get('/user', 'UserController@getUser');
    Route::post('/user', 'UserController@updateUser');
    Route::post('/user/toCart', 'UserController@addToCart');
    Route::get('/user/cart', 'UserController@getCart');
    Route::post('/user/cart', 'UserController@updateCart');
    Route::post('/user/cartDel', 'UserController@deleteItemCart');
    Route::get('/user/orders', 'UserController@getOrders');
    Route::post('/user/order', 'UserController@placeOrder');
  });

// Admin routes
Route::middleware(['auth:sanctum', 'admin', 'verify'])
  ->namespace('App\Http\Controllers\Api')
  ->group(function () {
    Route::get('/dashboard', 'ProductController@getAll');
    Route::get('/report', 'ReportController@getReport');
    Route::get('/users', 'UserController@getAllUsers');
    Route::put('/changeUser/{id}', 'UserController@changeUserStatus');
    Route::get('/orders', 'OrderController@getAll');
    Route::get('/order/{id}', 'OrderController@getOrder');
    Route::put('/order/{id}', 'OrderController@changeOrder');
    Route::get('/orders/{id}/items', 'OrderController@orderItems');
    Route::post('/product', 'ProductController@addProduct');
    Route::put('/product/{id}', 'ProductController@editProduct');
    Route::delete('/product/{id}', 'ProductController@deleteProduct');
  });
