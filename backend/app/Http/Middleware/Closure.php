<?php

namespace App\Http\Middleware;
use Illuminate\Http\Request;

use Closure;

class Closure
{
    public function handle(Request $request, Closure $next)
    {
        // Do something here...

        return $next($request);
    }
}