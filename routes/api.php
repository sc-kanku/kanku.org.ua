<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AthleteController;
use App\Http\Controllers\DojosController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RefreshSiteController;


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

Route::group(['prefix' => 'athlete'], function () {
    Route::get('list', [AthleteController::class, 'apiAthletes']);
    Route::post('update', [AthleteController::class, 'apiUpdateAthlete']);
    Route::post('update/schedule', [AthleteController::class, 'apiUpdateSchedule']);
// TODO: add /athlete/dojo/schedule' for add dojo instead /athlete/update/schedule
    Route::post('dojo/delete', [AthleteController::class, 'apiDojoDelete']);

    Route::get('edit/{id}', [AthleteController::class, 'apiEditAthlete']);
    Route::post('save/{id}', [AthleteController::class, 'apiSaveAthlete']);
});

Route::group(['prefix' => 'dojo'], function () {
    Route::get('list', [DojosController::class, 'apiDojos']);
    Route::post('update', [DojosController::class, 'apiUpdateDojo']);
    Route::get('edit/{id}', [DojosController::class, 'apiEditDojo']);
    Route::post('save/{id}', [DojosController::class, 'apiSaveDojo']);
});

Route::group(['prefix' => 'post'], function () {
    Route::get('list', [PostController::class, 'apiPosts']);
    Route::post('update', [PostController::class, 'apiUpdatePost']);
    Route::get('edit/{id}', [PostController::class, 'apiEditPost']);
    Route::post('save/{id}', [PostController::class, 'apiSavePost']);
});

Route::post('/site/refresh', [RefreshSiteController::class, 'refresh']);
// ->middleware('auth')->name('admin.refresh');

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/