<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;

class OrderController extends Controller
{
    public function getAll()
    {
        $orders = Order::all();
        $orders = $orders->makeHidden(['created_at', 'updated_at']);
        return response()->json(['orders' => $orders], 200);
    }

    public function getOrder($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        $order = $order->makeHidden(['created_at', 'updated_at']);
        return response()->json(['order' => $order], 200);
    }

    public function changeOrder($id, Request $request)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        $order->update(['order_status' => $request->input('status')]);
        return response()->json(['message' => 'Order status updated successfully']);
    }

    public function orderItems($id)
    {
        $items = OrderItem::where('order_id', $id)->get();
        $items = $items->makeHidden(['created_at', 'updated_at']);
        return response()->json(['items' => $items], 200);
    }
}
