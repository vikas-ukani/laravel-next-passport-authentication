<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\LoginController;

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

Route::group(['middleware' => ['cors', 'json.response']], function () {
    Route::post('login', [LoginController::class, 'login'])->name('login.api');
    Route::post('signup', [LoginController::class, 'signup'])->name('signup.api');

    Route::middleware(['auth:api'])->group(function () {
        Route::post('logout', [LoginController::class, 'logout'])->name('logout.api');
    });
});

Route::get('test', function () {
    return response()->json([
        'success' => true,
        'message' => "Welcome to the test api",
        'data' => ['name' => 'test']
    ]);
});
