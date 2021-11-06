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


Route::get('/athlete/list', [AthleteController::class, 'apiAthletes']);
Route::post('/athlete/update', [AthleteController::class, 'apiUpdateAthlete']);
Route::post('/athlete/update/schedule', [AthleteController::class, 'apiUpdateSchedule']);
// TODO: add /athlete/dojo/schedule' for add dojo instead /athlete/update/schedule
Route::post('/athlete/dojo/delete', [AthleteController::class, 'apiDojoDelete']);

Route::get('/athlete/edit/{id}', [AthleteController::class, 'apiEditAthlete']);
Route::post('/athlete/save/{id}', [AthleteController::class, 'apiSaveAthlete']);

Route::get('/dojo/list', [DojosController::class, 'apiDojos']);
Route::post('/dojo/update', [DojosController::class, 'apiUpdateDojo']);
Route::get('/dojo/edit/{id}', [DojosController::class, 'apiEditDojo']);
Route::post('/dojo/save/{id}', [DojosController::class, 'apiSaveDojo']);

Route::get('/post/list', [PostController::class, 'apiPosts']);
Route::post('/post/update', [PostController::class, 'apiUpdatePost']);
Route::get('/post/edit/{id}', [PostController::class, 'apiEditPost']);
Route::post('/post/save/{id}', [PostController::class, 'apiSavePost']);

Route::post('/site/refresh', [RefreshSiteController::class, 'refresh']);
// ->middleware('auth')->name('admin.refresh');

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/