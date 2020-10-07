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
Route::group([
    'prefix' => 'todos'
], function () {
    Route::group([
        'middleware' => 'auth:api'
      ], function() {
        Route::get('', 'Api\TodoController@todos');
        Route::post('', 'Api\TodoController@createTodo');
        Route::put('{id}', 'Api\TodoController@updateTodo');
        Route::delete('{id}', 'Api\TodoController@deleteTodo');
      });
});


// Api route for Auth
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'Api\AuthController@login');
    Route::post('signup', 'Api\AuthController@signup');

    Route::group([
        'middleware' => 'auth:api'
      ], function() {
          Route::get('logout', 'Api\AuthController@logout');
          Route::get('user', 'Api\AuthController@user');
      });
});
