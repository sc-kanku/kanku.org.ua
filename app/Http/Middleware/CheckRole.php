<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;

use Closure;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, String $role)
    {
        /*
        if (!$request->user()->hasRole($role)) {
            abort(401, 'This action is unauthorized.');
        }

        return $next($request);
        */
        /*
        if (!Auth::check()) {
            return redirect('/home');
        }*/

        $user = Auth::user();

        if ($user->hasRole($role)) {
            return $next($request);
        } else {
            return redirect('/' . $user->role);
        }
    }
}
