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


// Api router for todo
Route::get('todos', 'Api\TodoController@index'); 
Route::get('todos/{id}', 'Api\TodoController@show'); 
Route::post('todos', 'Api\TodoController@store'); 
Route::put('todos/{id}', 'Api\TodoController@update');
Route::delete('todos/{id}', 'Api\TodoController@destroy');


// Api router for User


// Api router for Auth


