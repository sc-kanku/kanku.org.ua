<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Http\Request;

class RefreshSiteController extends Controller
{
    public function refresh(Request $request)
    {
        try {
            Artisan::call('page-cache:clear');

            return ["status" => 'ok'];
        } catch (Exception $e) {
            return ["status" => 'error', "error" => $e];
        }
    }
}
