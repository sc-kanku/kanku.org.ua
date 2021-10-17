<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (Auth::guard($guard)->check()) {
            $role = Auth::user()->role;

            switch ($role) {
                case 'super-admin':
                    return redirect('/super-admin');
                    break;
                case 'admin':
                    return redirect('/admin');
                    break;
                case 'coach':
                    return redirect('/coach');
                    break;
                case 'athlete':
                    return redirect('/athlete');
                    break;
                default:
                    return redirect('/home');
                    break;
            }

            // return $next($request);
            // return redirect(RouteServiceProvider::HOME);
        }

        return $next($request);
    }
}
