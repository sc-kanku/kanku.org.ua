<?php

namespace App\Http\Middleware;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silber\PageCache\Middleware\CacheResponse as BaseCacheResponse;

use Illuminate\Support\Facades\Auth;

class GuestCacheResponse extends BaseCacheResponse
{
    protected function shouldCache(Request $request, Response $response)
    {
        // Disabled caching for now
        // TODO: implement Ajax admin menu
        return false
            && parent::shouldCache($request, $response)
            && !($request->getQueryString() || Auth::user());
    }
}
