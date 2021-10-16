<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function index()
    {
        return view('guest.login');
    }

    public function store(Request $request)
    {
        $ok = auth()->attempt([
            'email' => $request->user_email,
            'password' => $request->password
        ]);

        if ($ok) {
            $authenticatedUser = auth()->user();
            // dd($authenticatedUser);
            if ($authenticatedUser != null) {
                // TODO
                $role = $authenticatedUser->email == 'kanku.lviv@gmail.com' ||
                    $authenticatedUser->email == 'lybomur@ukr.net'
                    ? 4 // admin
                    : 1;

                // return 'ok,' . $role . ',' . $authenticatedUser->firstName; //'/login';
                // return redirect()->route('admin.dashboard');
                return redirect()->route('admin');
            } else {
                // return back() -> with('status', 'Invalid credentials');
                return 'Невірні облікові дані';
            }
        } else {
            return 'Невірні облікові дані';
        }
    }
}
