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
Route::get('/', [GeneralController::class, 'landing'])->name('home');
Route::get('/home', [GeneralController::class, 'landing']);

Route::get('/articles/club/info/', [GeneralController::class, 'info']);
Route::get('/articles/club/wko-recognition/', [GeneralController::class, 'recognition']);

Route::get('/instructors', [AthleteController::class, 'index'])->name('guest.instructors');
Route::get('/instructors/{instructor}', [AthleteController::class, 'details']);
Route::get('/athletes/best', [AthleteController::class, 'best']);
Route::get('/athletes/black-belts', [AthleteController::class, 'blacks']);

Route::get('/dojos', [DojosController::class, 'index'])->name('guest.dojos');
Route::get('/dojos/{dojo}', [DojosController::class, 'details']);

Route::get('/blog', [PostController::class, 'index'])->name('guest.blog');
Route::get('/blog/{post}', [PostController::class, 'details']);

Route::view('/contacts/', 'guest.contacts');

Route::get('/gallery/{gallery}', [GalleriesController::class, 'details']);

Route::view('/gallery/', 'raw-content.gallery.list');


// Articles

Route::view('/articles/theory/style-history/', 'raw-content.articles.theory.style-history');
Route::view('/articles/theory/philosophy/', 'raw-content.articles.theory.philosophy');
Route::view('/articles/theory/masutatsu-oyama/', 'raw-content.articles.theory.masutatsu-oyama');
Route::view('/articles/theory/oyama-bio/', 'raw-content.articles.theory.oyama-bio');
Route::view('/articles/theory/dojo-kun/', 'raw-content.articles.theory.dojo-kun');
Route::view('/articles/theory/mottos/', 'raw-content.articles.theory.mottos');
Route::view('/articles/theory/shinkyokushinkai/', 'raw-content.articles.theory.shinkyokushinkai');
Route::view('/articles/theory/kyokushinkai-in-ukraine/', 'raw-content.articles.theory.kyokushinkai-in-ukraine');
Route::view('/articles/theory/kata-principles/', 'raw-content.articles.theory.kata-principles');
Route::view('/articles/theory/kata/', 'raw-content.articles.theory.kata');
Route::view('/articles/theory/kime-kiay/', 'raw-content.articles.theory.kime-kiay');
Route::view('/articles/theory/kyokushinkai-kanku/', 'raw-content.articles.theory.kyokushinkai-kanku');
Route::view('/articles/theory/tanden/', 'raw-content.articles.theory.tanden');
Route::view('/articles/theory/warm-up/', 'raw-content.articles.theory.warm-up');
Route::view('/articles/theory/skill-degrees/', 'raw-content.articles.theory.skill-degrees');
Route::view('/articles/theory/ethics/', 'raw-content.articles.theory.ethics');
Route::view('/articles/theory/dogi-obi/', 'raw-content.articles.theory.dogi-obi');
Route::view('/articles/theory/dictionary/', 'raw-content.articles.theory.dictionary');
Route::view('/articles/for-parents/why-karate/', 'raw-content.articles.for-parents.why-karate');
Route::view('/articles/for-parents/how-to-start/', 'raw-content.articles.for-parents.how-to-start');
Route::view('/articles/for-parents/teach-to-win/', 'raw-content.articles.for-parents.teach-to-win');
Route::view('/articles/for-parents/doesnt-work/', 'raw-content.articles.for-parents.doesnt-work');
Route::view('/articles/for-parents/advice/', 'raw-content.articles.for-parents.advice');
Route::view('/articles/for-parents/faq/', 'raw-content.articles.for-parents.faq');
Route::view('/articles/for-parents/review/', 'raw-content.articles.for-parents.review');
Route::view('/service/karate-for-kids/', 'raw-content.articles.for-parents.why-karate');
Route::view('/service/karate-for-adults/', 'raw-content.articles.service.karate-for-adults');
Route::view('/service/karate-for-girls/', 'raw-content.articles.service.karate-for-girls');
Route::view('/articles/club/kanku-history/', 'raw-content.articles.club.kanku-history');


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

Route::get('/prepare-build', [HelperController::class, 'artisan']);
