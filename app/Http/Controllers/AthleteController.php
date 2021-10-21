<?php

namespace App\Http\Controllers;

use App\Models\Athlete;
use Illuminate\Http\Request;
use Exception;


class AthleteController extends Controller
{
    public function index()
    {
        $athletes = Athlete
            ::where('is_actual', '=', 1)
            ->where('is_coach', '=', 1)
            ->orderByDesc("degree")
            ->get();

        return view('guest.instructors.template.list', [
            'athletes' => $athletes
        ]);
    }

    public function details($instructorKeyword)
    {
        $athlete = Athlete::where('page_dir', $instructorKeyword)->first();

        if ($athlete !== null) {
            // TODO: Move it to proper place
            // TODO: Use blade templating engine for this?
            $content = $athlete->full;

            $property = 'degree1';
            $re = '/##' . $property . '##/';

            $content = preg_replace($re, $athlete->degree, $content);

            $athlete->full = $content;

            return view('guest.instructors.template.instructor', [
                'athlete' => $athlete
            ]);
        } else {
            return view('guest.instructors.template.instructornotfound', [
                'athlete' => $athlete
            ]);
        }
    }

    public function blacks()
    {
        $athletes = Athlete
            ::where('degree', '>', 0)
            ->where('show_in_blacks', '=', 1)
            ->orderByDesc("degree")
            ->orderBy("birthday")
            ->get();

        return view('guest.instructors.template.list', [
            'athletes' => $athletes
        ]);
    }


    public function best()
    {
        $athletes = Athlete
            ::where('is_best', '=', 1)
            ->orderByDesc("degree")
            ->orderBy("birthday")
            ->get();

        return view('guest.instructors.template.list', [
            'athletes' => $athletes
        ]);
    }

    public function apiAthletes()
    {
        return Athlete::get();
    }

    public function apiUpdateAthlete(Request $request)
    {
        try {
            // TODO: degeree is not saved in inline editing.
            $result = Athlete
                ::where('id', $request->get('id'))
                ->update([$request->get('field') => $request->get('value')]);

            $queryStatus = "{Successful: " . $result . "}";
        } catch (Exception $e) {
            $queryStatus = "{Not success: " . $e . "}";
        }

        return $queryStatus;
    }

    public function apiEditAthlete($id)
    {
        $athlete = Athlete::where('id', $id)->with('dojos')->get()->first();

        return $athlete;
    }

    public function apiSaveAthlete(Request $request, $id)
    {
        $data = $request->all();

        $result = Athlete::find($id)->update($data);

        return $result;
    }
}
