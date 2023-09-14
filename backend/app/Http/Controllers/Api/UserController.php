<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\OrderItem;

class UserController extends Controller
{
    public function getAllUsers()
    {
        $users = User::where('is_admin', 0)->get();
        $users = $users->makeHidden(['email_verified_at', 'is_admin', 'created_at', 'updated_at']);
        return response()->json(['users' => $users], 200);
    }

    public function getUser()
    {
        $user = User::find(auth()->id());
        if (!$user) return response()->json(['message' => 'User not found, Unauthorized'], 404);

        $user = $user->makeHidden(['email_verified_at', 'is_admin', 'created_at', 'updated_at']);
        return response()->json(['user' => $user], 200);
    }

    public function updateUser(Request $request)
    {
        $data = $request->only(['name', 'phone', 'address']);
        $validator = validator($data, [
            'name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:1000',
        ]);
        if ($validator->fails()) return response()->json(['message' => $validator->errors()], 400);

        $user = User::find(auth()->id());
        if (!$user) return response()->json(['message' => 'User not found'], 404);

        $user->update($data);
        return response()->json(['message' => 'User data updated successfully'], 200);
    }

    public function changeUserStatus($id)
    {
        $user = User::find($id);
        if (!$user) return response()->json(['message' => 'User not found'], 404);

        $user->update(['active' => !$user->active]);
        return response()->json(['message' => 'User status changed successfully'], 200);
    }

    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
        $user = User::find(auth()->id());
        if (!$user) return response()->json(['message' => 'User not found'], 404);

        $product_id = $request->input('product_id');
        $quantity = $request->input('quantity');
        $cart = $user->cart;
        if ($cart) {
            foreach ($cart as &$item) {
                if ($item['product_id'] == $product_id)
                    return response()->json(['message' => 'Product already in your cart!'], 400);
            }
        }
        $cart[] = ['product_id' => $product_id, 'quantity' => $quantity];
        $user->cart = $cart;
        $user->save();
        return response()->json(['message' => 'Product added to cart', 'cart' => $user->cart], 200);
    }

    public function getOrders()
    {
        $user = User::find(auth()->id());
        if (!$user) return response()->json(['message' => 'User not found'], 404);
        $orders = Order::where('user_id', $user->id)->with('orderItems')->get();
        return response()->json(['orders' => $orders], 200);
    }

    public function getCart()
    {
        $user = auth()->user();
        $cartItems = $user->cart;
        $productIds = collect($cartItems)->pluck('product_id')->unique();
        $products = Product::whereIn('id', $productIds)->get();
        $cartWithProducts = collect($cartItems)->map(function ($cartItem) use ($products) {
            $product = $products->firstWhere('id', $cartItem['product_id']);
            return ['quantity' => $cartItem['quantity'], 'product' => $product];
        });
        return response()->json(['items' => $cartWithProducts], 200);
    }

    public function updateCart(Request $request)
    {
        $request->validate([
            'index' => 'required|integer',
            'quantity' => 'required|integer|min:1'
        ]);
        $user = User::find(auth()->id());
        if (!$user) return response()->json(['message' => 'User not found'], 404);

        $cart = $user->cart;
        $index = $request->input('index');
        if ($index < 0 || $index >= count($cart))
            return response()->json(['message' => 'Invalid cart item index'], 404);

        $cart[$index]['quantity'] = $request->input('quantity');
        $user->update(['cart' => $cart]);
        return response()->json(['message' => 'Item quantity updated', 'cart' => $cart], 200);
    }

    public function deleteItemCart(Request $request)
    {
        $request->validate(['index' => 'required|integer']);
        $user = User::find(auth()->id());
        if (!$user) return response()->json(['message' => 'User not found'], 404);

        $cart = $user->cart;
        $index = $request->input('index');
        if ($index < 0 || $index >= count($cart))
            return response()->json(['message' => 'Invalid cart item index'], 404);

        array_splice($cart, $index, 1);
        $user->update(['cart' => $cart]);
        return response()->json(['message' => 'Item deleted from the cart'], 200);
    }

    public function placeOrder()
    {
        $user = User::find(auth()->id());
        if (!$user) return response()->json(['message' => 'User not found'], 404);

        $order = new Order([
            'customer_name' => $user->name,
            'customer_email' => $user->email,
            'customer_phone' => $user->phone,
            'customer_address' => $user->address,
            'user_id' => auth()->id(),
            'order_number' => time(),
            'order_date' => now(),
            'order_status' => 'pending',
            'order_total' => 0
        ]);
        $order->save();
        $totalOrder = 0;
        $cart = $user->cart;
        foreach ($cart as $item) {
            $product = Product::find($item['product_id']);
            if ($product) {
                $subtotal = $item['quantity'] * $product->price;
                $totalOrder += $subtotal;
                $orderItem = new OrderItem([
                    'product_id' => $item['product_id'],
                    'product_name' => $product->name,
                    'product_price' => $product->price,
                    'order_id' => $order->id,
                    'product_subtotal' => $subtotal,
                    'product_quantity' => $item['quantity']
                ]);
                $orderItem->save();
            }
        }
        $order->update(['order_total' => $totalOrder]);
        $user->update(['n_orders' => ($user->n_orders) + 1]);
        $user->update(['cart' => []]);
        return response()->json(['message' => 'Order created successfully'], 200);
    }
}
