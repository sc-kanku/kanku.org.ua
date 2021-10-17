<?php

namespace App\Http\Controllers\Auth;


use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;
    /*
    protected function guard()
    {
        return Auth::guard('athletes');
    }
*/
    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    // protected $redirectTo = RouteServiceProvider::HOME;

    public function redirectTo()
    {
        $user = auth()->user();

        if ($user->hasRole('super-admin')) {
            return '/super-admin';
        } else if ($user->hasRole('admin')) {
            return '/admin';
        } else if ($user->hasRole('coach')) {
            return '/coach';
        } else if ($user->hasRole('athlete')) {
            return '/athlete';
        } else if ($user->hasRole('home')) {
            return '/home';
        }
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}
