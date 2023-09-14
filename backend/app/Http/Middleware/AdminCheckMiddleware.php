<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminCheckMiddleware
{
    public function handle($request, Closure $next)
    {
        $user = auth()->user();
        if ($user && $user->is_admin) return $next($request);
        $m = 'Unauthorized. You must be an admin to access this resource.';
        return response()->json(['message' => $m], 403);
    }
}
