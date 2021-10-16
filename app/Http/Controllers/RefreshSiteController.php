<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RefreshSiteController extends Controller
{
    /*
        Route::get('/', function () {
            return View::make('greeting', array('name' => 'Taylor'));
        });
        */

    // The second argument passed to View::make is an array of data that ...
    public function refresh(Request $request)
    {
        // $html = view('users.edit', compact('user'))->render();
        // https://stackoverflow.com/questions/50938285/how-to-get-blade-template-view-as-a-raw-html-string


        // Laravel Page Cache
        // https: //github.com/JosephSilber/page-cache


        // TODO;
        return ['updated' => 0];
    }
}
