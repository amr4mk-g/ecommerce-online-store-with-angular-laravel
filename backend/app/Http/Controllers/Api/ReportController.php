<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use App\Models\Order;

class ReportController extends Controller
{
    public function getReport()
    {
        $p_in = Product::where('status', 'in')->count();
        $p_out = Product::where('status', 'out')->count();
        $p_soon = Product::where('status', 'soon')->count();

        $u_in = User::where('active', true)->count();
        $u_out = User::where('active', false)->count();
        $u_admin = User::where('is_admin', true)->count();

        $o_pend = Order::where('order_status', 'pending')->count();
        $o_ship = Order::where('order_status', 'shipped')->count();
        $o_done = Order::where('order_status', 'delivered')->count();
        $o_cancel = Order::where('order_status', 'canceled')->count();

        $data = [
            'products_in' => $p_in, 'products_out' => $p_out,
            'products_soon' => $p_soon, 'users_in' => $u_in,
            'users_out' => $u_out, 'users_admin' => $u_admin,
            'orders_pending' => $o_pend, 'orders_shipped' => $o_ship,
            'orders_delivered' => $o_done, 'orders_canceled' => $o_cancel
        ];
        return response()->json($data, 200);
    }
}
