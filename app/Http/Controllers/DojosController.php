<?php

namespace App\Http\Controllers;

use App\Helpers;
use App\Models\Dojo;
use Illuminate\Http\Request;
use Exception;

class DojosController extends Controller
{
    public function index()
    {

        $lvivDojos = Dojo
            ::where('is_actual', '=', 1)
            ->where('place', '=', 1)
            ->get();

        $regionDojos = Dojo
            ::where('is_actual', '=', 1)
            ->where('place', '=', 2)
            ->get();

        return view('guest.dojos.list', [
            'lvivDojos' => $lvivDojos,
            'regionDojos' => $regionDojos
        ]);
    }

    public function details($dojoKeyword)
    {
        $dojo = Dojo::where('url', $dojoKeyword)->first();

        if ($dojo !== null) {
            return view('guest.dojos.dojo', [
                'dojo' => $dojo
            ]);
        } else {
            return view('guest.dojos.dojo-not-found', [
                'dojo' => $dojo
            ]);
        }
    }

    public function apiDojos()
    {
        $dojos = Dojo
            // ::where('is_actual', '=', 1)
            // ::orderBy("name")
            ::orderByDesc("is_actual")
            ->orderBy("name")
            ->get();

        return $dojos;
    }

    public function apiUpdateDojo(Request $request)
    {
        try {
            $id = ($request->get('id'));
            $field = ($request->get('field'));
            $value = ($request->get('value'));

            if ($id == null) {
                $dojo = Dojo::createNewDefault();

                if ($field == 'photo') {
                    Dojo::processPath($field, $value, $dojo);
                    $dojo[$field] = $value;
                }

                $result = $dojo->save();

                if ($field == 'photo') {
                    $result = Dojo::addPhoto($dojo->id, $field, $value, $dojo->getPhotosPath());
                }

                $queryStatus = ["Successful" => $result ? "yes" : "no", "id" => $dojo->id];
            } else {
                if ($field == 'photo') {
                    $result = Dojo::addPhoto($id, $field, $value, Dojo::createNewDefault()->getPhotosPath());
                } else {
                    $dojoDetails = [$field => $value];
                    Dojo::processPath($field, $value, $dojoDetails);

                    // TODO: degeree is not saved in inline editing.
                    $result = Dojo
                        ::where('id', $id)
                        ->update($dojoDetails);
                }

                $queryStatus = ["Successful" => $result ? "yes" : "no"];
            }
        } catch (Exception $e) {
            $queryStatus = ["Unsuccessful" => $e];
        }

        return $queryStatus;
    }

    public function apiEditDojo($id)
    {
        $dojo = Dojo::where('id', $id)->with('athletes')->get()->first();

        return $dojo;
    }

    public function apiSaveDojo(Request $request, $id)
    {
        $data = $request->all();

        $result = Dojo::find($id)->update($data);

        return $result;
    }
}
