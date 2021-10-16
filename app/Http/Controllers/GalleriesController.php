<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;

class GalleriesController extends Controller
{
    public function details($galleryKeyword)
    {
        $page = Page::where('page_dir', 'content/gallery/' . $galleryKeyword)->first();

        if ($page != null) {
            return view('guest.photos.list', ['page' => $page]);
        }
    }
}
