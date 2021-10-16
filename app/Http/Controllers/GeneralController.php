<?php

namespace App\Http\Controllers;

use App\Models\Athlete;
use App\Models\Dojo;
use Illuminate\Http\Request;

class GeneralController extends Controller
{
    public function landing()
    {
        $years = now()->year - 1994; // 27
        $dojos = Dojo // 50
            ::where('is_actual', '=', 1)
            ->count();

        $instructors = Athlete // 33
            ::where('is_actual', '=', 1)
            ->where('is_coach', '=', 1)
            ->count();

        return view('guest.landing.landing', [
            'years' => $years,
            'dojos' => $dojos,
            'instructors' => $instructors
        ]);
    }

    public function info()
    {
        $years = now()->year - 1994; // 27
        $dojos = Dojo // 50
            ::where('is_actual', '=', 1)
            ->count();

        $instructors = Athlete // 33
            ::where('is_actual', '=', 1)
            ->where('is_coach', '=', 1)
            ->count();

        $degree = Athlete::where('id', '=', 1)->get()->first()->degree;

        return view('raw-content.articles.club.info', [
            'years' => $years,
            'dojos' => $dojos,
            'instructors' => $instructors,
            'degree' => $degree
        ]);
    }

    public function recognition()
    {
        $degree = Athlete::where('id', '=', 1)->get()->first()->degree;

        return view('raw-content.articles.club.wko-recognition', [
            'degree' => $degree
        ]);
    }
}
