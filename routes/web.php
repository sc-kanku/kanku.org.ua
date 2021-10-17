<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\AthleteController;
use App\Http\Controllers\DojosController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\GalleriesController;
use App\Http\Controllers\GeneralController;

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


Route::get('/contacts/', function () {
    return view('guest.contacts');
})->name('guest.contacts');

Route::get('/gallery/{gallery}', [GalleriesController::class, 'details']);
Route::get('/gallery/', function () {
    return view('raw-content.gallery.list');
});

// Articles

Route::get('/articles/theory/style-history/', function () {
    return view('raw-content.articles.theory.style-history');
});
Route::get('/articles/theory/philosophy/', function () {
    return view('raw-content.articles.theory.philosophy');
});
Route::get('/articles/theory/masutatsu-oyama/', function () {
    return view('raw-content.articles.theory.masutatsu-oyama');
});
Route::get('/articles/theory/oyama-bio/', function () {
    return view('raw-content.articles.theory.oyama-bio');
});

Route::get('/articles/theory/dojo-kun/', function () {
    return view('raw-content.articles.theory.dojo-kun');
});
Route::get('/articles/theory/mottos/', function () {
    return view('raw-content.articles.theory.mottos');
});
Route::get('/articles/theory/shinkyokushinkai/', function () {
    return view('raw-content.articles.theory.shinkyokushinkai');
});

Route::get('/articles/theory/kyokushinkai-in-ukraine/', function () {
    return view('raw-content.articles.theory.kyokushinkai-in-ukraine');
});
Route::get('/articles/theory/kata-principles/', function () {
    return view('raw-content.articles.theory.kata-principles');
});
Route::get('/articles/theory/kata/', function () {
    return view('raw-content.articles.theory.kata');
});

Route::get('/articles/theory/kime-kiay/', function () {
    return view('raw-content.articles.theory.kime-kiay');
});
Route::get('/articles/theory/kyokushinkai-kanku/', function () {
    return view('raw-content.articles.theory.kyokushinkai-kanku');
});
Route::get('/articles/theory/tanden/', function () {
    return view('raw-content.articles.theory.tanden');
});

Route::get('/articles/theory/warm-up/', function () {
    return view('raw-content.articles.theory.warm-up');
});
Route::get('/articles/theory/skill-degrees/', function () {
    return view('raw-content.articles.theory.skill-degrees');
});
Route::get('/articles/theory/ethics/', function () {
    return view('raw-content.articles.theory.ethics');
});

Route::get('/articles/theory/dogi-obi/', function () {
    return view('raw-content.articles.theory.dogi-obi');
});
Route::get('/articles/theory/dictionary/', function () {
    return view('raw-content.articles.theory.dictionary');
});

Route::get('/articles/for-parents/why-karate/', function () {
    return view('raw-content.articles.for-parents.why-karate');
});

Route::get('/articles/for-parents/how-to-start/', function () {
    return view('raw-content.articles.for-parents.how-to-start');
});
Route::get('/articles/for-parents/teach-to-win/', function () {
    return view('raw-content.articles.for-parents.teach-to-win');
});
Route::get('/articles/for-parents/doesnt-work/', function () {
    return view('raw-content.articles.for-parents.doesnt-work');
});

Route::get('/articles/for-parents/advice/', function () {
    return view('raw-content.articles.for-parents.advice');
});

Route::get('/articles/for-parents/faq/', function () {
    return view('raw-content.articles.for-parents.faq');
});

Route::get('/articles/for-parents/review/', function () {
    return view('raw-content.articles.for-parents.review');
});




Route::get('/service/karate-for-kids/', function () {
    return view('raw-content.articles.for-parents.why-karate');
});

Route::get('/service/karate-for-adults/', function () {
    return view('raw-content.articles.service.karate-for-adults');
});

Route::get('/service/karate-for-girls/', function () {
    return view('raw-content.articles.service.karate-for-girls');
});


Route::get('/articles/club/kanku-history/', function () {
    return view('raw-content.articles.club.kanku-history');
});








/*


Route::get('/gallery/competition/', function () {
    return view('raw-content.gallery.list');
});

Route::get('/gallery/', function () {
    return view('raw-content.gallery.list');
});
Route::get('/gallery/', function () {
    return view('raw-content.gallery.list');
});
Route::get('/gallery/', function () {
    return view('raw-content.gallery.list');
});

http: //localhost:8000/gallery/competition/
*/

// Other raw content

/**

<a class="nav-link" href="/athletes/best/">Найкращі спортсмени</a>
<a class="nav-link" href="/athletes/black-belts/">Чорні пояси</a>


 */

// Admin

// Using Laravel authentication instead
// Route::get('/user/login', [LoginController::class, 'index'])->name('login');
// Route::post('/user/login', [LoginController::class, 'store']);
// Route::any('/user/logout', [LogoutController::class, 'logout'])->name('logout');


Route::view('/admin/{entity?}/{method?}/{param?}', 'layouts.admin')
    ->middleware('auth')
    ->middleware('role:admin')
    ->name('admin');

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



/*
    ->name('admin.dashboard')
    ->name('admin.instructors')
    ->name('admin.dojos')
    ->name('admin.news')*/


/*
Route::any('/admin/dashboard', function () {
    return view('admin.dashboard');
})->middleware('auth')->name('admin.dashboard');

Route::get('/admin/instructors/', function () {
    return view('admin.instructors');
})->middleware('auth')->name('admin.instructors');

Route::get('/admin/dojos/', function () {
    return view('admin.dojos');
})->middleware('auth')->name('admin.dojos');

Route::get('/admin/news/', function () {
    return view('admin.news');
})->middleware('auth')->name('admin.news');

Route::any('/admin/site/refresh/', [RefreshSiteController::class, 'refresh'])
    ->middleware('auth')->name('admin.refresh');

*/


// Route::get('/', [ShinController::class, 'index'])->where('path', '.*');

// use App\Http\Controllers\ShinController;

// Route::any('{path}', [ShinController::class, 'index'])->where('path', '.*');

Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');
