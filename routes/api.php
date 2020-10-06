<?php

use Illuminate\Http\Request;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


// Api route for todo
Route::group(['prefix' => 'todos'], function () {
    Route::get('', 'TodoController@index');
    Route::get('{id}', 'TodoController@show');
    Route::post('', 'TodoController@store');
    Route::put('{id}', 'TodoController@update');
    Route::delete('{id}', 'TodoController@destroy');
});


// Api route for Auth
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
});
// Api router for Auth
