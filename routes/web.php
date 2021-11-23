<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\AthleteController;
use App\Http\Controllers\DojosController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\GalleriesController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\HelperController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*
Route::get('/', function () {
    return view('welcome');
});*/

// Route::get('/user', [UserController::class, 'index']);

// TODO?: make templated vars to be editable for users
Route::get('/', [GeneralController::class, 'landing'])->middleware('cache.static.pages')->name('home');
Route::get('/home', [GeneralController::class, 'landing'])->middleware('cache.static.pages');

Route::get('/articles/club/info/', [GeneralController::class, 'info'])->middleware('cache.static.pages');
Route::get('/articles/club/wko-recognition/', [GeneralController::class, 'recognition'])->middleware('cache.static.pages');

Route::get('/instructors', [AthleteController::class, 'index'])->middleware('cache.static.pages')->name('guest.instructors');
Route::get('/instructors/{instructor}', [AthleteController::class, 'details'])->middleware('cache.static.pages');
Route::get('/athletes/best', [AthleteController::class, 'best'])->middleware('cache.static.pages');
Route::get('/athletes/black-belts', [AthleteController::class, 'blacks'])->middleware('cache.static.pages');

Route::get('/dojos', [DojosController::class, 'index'])->middleware('cache.static.pages')->name('guest.dojos');
Route::get('/dojos/{dojo}', [DojosController::class, 'details'])->middleware('cache.static.pages');

// TODO: Pager doesnt work if caching is on
Route::get('/blog', [PostController::class, 'index']); // TODO: ->middleware('cache.static.pages')->name('guest.blog');
Route::get('/blog/{post}', [PostController::class, 'details'])->middleware('cache.static.pages');

Route::view('/contacts/', 'guest.contacts')->middleware('cache.static.pages');

Route::get('/gallery/{gallery}', [GalleriesController::class, 'details'])->middleware('cache.static.pages');

Route::view('/gallery/', 'raw-content.gallery.list')->middleware('cache.static.pages');


// Articles
Route::group(['prefix' => 'articles' ,'middleware' => 'cache.static.pages'], function () {

    Route::view('club/kanku-history', 'raw-content.articles.club.kanku-history');

    Route::group(['prefix' => 'theory'], function () {
        Route::view('style-history', 'raw-content.articles.theory.style-history');
        Route::view('philosophy', 'raw-content.articles.theory.philosophy');
        Route::view('masutatsu-oyama', 'raw-content.articles.theory.masutatsu-oyama');
        Route::view('oyama-bio', 'raw-content.articles.theory.oyama-bio');
        Route::view('dojo-kun', 'raw-content.articles.theory.dojo-kun');
        Route::view('mottos', 'raw-content.articles.theory.mottos');
        Route::view('shinkyokushinkai', 'raw-content.articles.theory.shinkyokushinkai');
        Route::view('kyokushinkai-in-ukraine', 'raw-content.articles.theory.kyokushinkai-in-ukraine');
        Route::view('kata-principles', 'raw-content.articles.theory.kata-principles');
        Route::view('kata', 'raw-content.articles.theory.kata');
        Route::view('kime-kiay', 'raw-content.articles.theory.kime-kiay');
        Route::view('kyokushinkai-kanku', 'raw-content.articles.theory.kyokushinkai-kanku');
        Route::view('tanden', 'raw-content.articles.theory.tanden');
        Route::view('warm-up', 'raw-content.articles.theory.warm-up');
        Route::view('skill-degrees', 'raw-content.articles.theory.skill-degrees');
        Route::view('ethics', 'raw-content.articles.theory.ethics');
        Route::view('dogi-obi', 'raw-content.articles.theory.dogi-obi');
        Route::view('dictionary', 'raw-content.articles.theory.dictionary');
    });

    Route::group(['prefix' => 'for-parents'], function () {
        Route::view('why-karate', 'raw-content.articles.for-parents.why-karate');
        Route::view('how-to-start', 'raw-content.articles.for-parents.how-to-start');
        Route::view('teach-to-win', 'raw-content.articles.for-parents.teach-to-win');
        Route::view('doesnt-work', 'raw-content.articles.for-parents.doesnt-work');
        Route::view('advice', 'raw-content.articles.for-parents.advice');
        Route::view('faq', 'raw-content.articles.for-parents.faq');
        Route::view('review', 'raw-content.articles.for-parents.review');
    });
});

Route::view('/service/karate-for-kids/', 'raw-content.articles.for-parents.why-karate')->middleware('cache.static.pages');
Route::view('/service/karate-for-adults/', 'raw-content.articles.service.karate-for-adults')->middleware('cache.static.pages');
Route::view('/service/karate-for-girls/', 'raw-content.articles.service.karate-for-girls')->middleware('cache.static.pages');



// Admin

// Using Laravel authentication instead
// Route::get('/user/login', [LoginController::class, 'index'])->name('login');
// Route::post('/user/login', [LoginController::class, 'store']);
// Route::any('/user/logout', [LogoutController::class, 'logout'])->name('logout');


Route::view('/admin/{entity?}/{method?}/{param?}', 'layouts.admin')
    ->middleware('auth')
    ->middleware('role:admin')
    ->name('admin');
/*
Route::get('/athlete/{entity?}/{method?}/{param?}', function () {
    return 'role-athlete';
})->middleware('auth')
    ->middleware('role:athlete')
    ->name('athlete');

Route::get('/coach/{entity?}/{method?}/{param?}', function () {
    return 'role-coach';
})->middleware('auth')
    ->middleware('role:coach')
    ->name('coach');
*/

Auth::routes();

Route::get('/prepare-build', [HelperController::class, 'prepareBuild']);
