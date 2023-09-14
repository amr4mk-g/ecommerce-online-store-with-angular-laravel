<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Order::factory()->count(20)->create()
            ->each(function ($order) {
                $products = Product::inRandomOrder()->limit(rand(1, 5))->get();
                foreach ($products as $product) {
                    $quantity = rand(1, 5);
                    $order->orderItems()->save(OrderItem::factory()->make([
                        'product_id' => $product->id,
                        'product_name' => $product->name,
                        'product_price' => $product->price,
                        'product_quantity' => $quantity,
                        'product_subtotal' => $product->price * $quantity,
                    ]));
                }
            });
    }
}
