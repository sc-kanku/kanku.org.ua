<?php

namespace App\Http\Controllers;

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
            return view('guest.dojos.dojoNotFound', [
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
            // TODO: degeree is not saved in inline editing.
            $result = Dojo
                ::where('id', $request->get('id'))
                ->update([$request->get('field') => $request->get('value')]);

            $queryStatus = "{Successful: " . $result . "}";
        } catch (Exception $e) {
            $queryStatus = "{Not success: " . $e . "}";
        }

        return $queryStatus;
    }

    public function apiEditDojo($id)
    {
        $athlete = Dojo::where('id', $id)->with('athletes')->get()->first();

        return $athlete;
    }

    public function apiSaveDojo(Request $request, $id)
    {
        $data = $request->all();

        $result = Dojo::find($id)->update($data);

        return $result;
    }
}
