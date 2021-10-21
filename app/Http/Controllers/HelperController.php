<?php

namespace App\Http\Controllers;

use Exception;

use Illuminate\Support\Facades\Artisan;


class HelperController extends Controller
{
    public function prepareBuild()
    {
        try {
            Artisan::call('optimize:clear');
            Artisan::call('optimize');
            Artisan::call('config:cache');
            Artisan::call('route:cache');

            return ["status" => 'ok'];
        } catch (Exception $e) {
            return ["status" => 'error', "error" => $e];
        }
    }
}
