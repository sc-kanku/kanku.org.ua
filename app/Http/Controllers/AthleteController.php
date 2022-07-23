<?php

namespace App\Http\Controllers;

use App\Helpers;
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
            return view('guest.instructors.template.instructor-not-found', [
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
            $id = $request->get('id');
            $field = $request->get('field');
            $value = $request->get('value');

            if ($id == null) {
                $athlete = Athlete::createNewDefault();

                if ($field !== 'photo') {
                    $athlete->processPath($field, $value);
                    $athlete[$field] = $value;
                }

                $athlete->save();

                $result = Athlete::processPhoto($athlete->id, $field, $value);

                $queryStatus = ["Successful" => $result ? "yes" : "no", "id" => $athlete->id];
            } else {
                // TODO: degeree is not saved in inline editing.
                // DONE. Already saved on edit Athlethe page, check on Athletes list page.

                if ($field == "firstName" || $field == "lastName" || $field == "patronymic") {
                    $athlete = Athlete::where('id', $id)->first();
                    $athlete->processPath($field, $value);
                    $athlete[$field] = $value;
                    $result = $athlete->save();
                } else if ($field == "photo") {
                    $result = Athlete::processPhoto($id, $field, $value);
                } else {
                    $result = Athlete
                        ::where('id', $request->get('id'))
                        ->update([$field => $value]);
                }

                $queryStatus = ["Successful" => $result ? "yes" : "no"];
            }
        } catch (Exception $e) {
            $queryStatus = ["Unsuccessful" => $e];
        }

        return $queryStatus;
    }

    public function apiUpdateSchedule(Request $request)
    {
        try {
            $athleteId = $request->get('athleteId');

            if ($athleteId == null) {
                $athlete = Athlete::createNewDefault();
                $athlete->save();
            } else {
                $athlete = Athlete::where('id', $athleteId)->first();
            }

            $dojoId = $request->get('dojoId');
            $schedule = $request->get('schedule');

            // dd($athleteId, $dojoId, $schedule);

            $result = $athlete->dojos()
                ->syncWithoutDetaching([$dojoId => ['schedule' => $schedule, 'schedule_notes' => '']]);

            if ($athleteId == null) {
                $queryStatus = ["Successful" => $result, "id" => $athlete->id];
            } else {
                $queryStatus = ["Successful" => $result];
            }

        } catch (Exception $e) {
            $queryStatus = ["Unsuccessful" => $e];
        }

        return $queryStatus;
    }

    public function apiDojoDelete(Request $request)
    {
        try {
            $athleteId = $request->get('athleteId');
            $dojoId = $request->get('dojoId');

            $result = Athlete
                ::where('id', $athleteId)
                ->first()
                ->dojos()
                ->detach([$dojoId]);
            //->syncWithoutDetaching([$dojoId => ['schedule' => $schedule, 'schedule_notes' => '']]);

            $queryStatus = ["Successful" => $result];
        } catch (Exception $e) {
            $queryStatus = ["Unsuccessful" => $e];
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
