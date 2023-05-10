<?php

use App\Http\Controllers\GroupController;
use App\Http\Controllers\HelpController;
use App\Http\Controllers\PostActionController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/register', 'App\Http\Controllers\AuthController@register');
Route::post('/login', 'App\Http\Controllers\AuthController@login');
Route::get('/test', 'App\Http\Controllers\AuthController@test');
Route::get('/data2excel', 'App\Http\Controllers\HelpController@data2Excel');

Route::middleware('auth:api')->get('/check_auth', 'App\Http\Controllers\AuthController@checkAuth');

Route::group(['middleware' => ['auth:api']], function () {
    Route::apiResource('group', GroupController::class);
    Route::post('join-group/{group}', [GroupController::class, 'attachUser']);

    Route::group(['prefix' => 'posts'], function () {
        Route::post('{id}/mated-toggle', [PostController::class, 'matedToggle']);
        Route::post('{id}/like-toggle', [PostActionController::class, 'likeToggle']);
        Route::post('{id}/add-comment', [PostActionController::class, 'addComment']);
        Route::post('{id}/delete-comment', [PostActionController::class, 'deleteComment']);
    });
    Route::apiResource('posts', PostController::class);

    Route::group(['prefix' => 'profile'], function () {
        Route::post('update', [UserController::class, 'updateProfile']);
        Route::get('user/{user}', [UserController::class, 'show']);
    });

    Route::group(['prefix' => 'predefined'], function () {
        Route::get('interests', [HelpController::class, 'interests']);
    });

});
