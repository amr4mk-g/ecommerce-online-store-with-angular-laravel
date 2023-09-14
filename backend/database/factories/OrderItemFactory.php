<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_name' => fake()->words(3, true),
            'product_price' => fake()->randomFloat(2, 1, 100),
            'product_quantity' => fake()->numberBetween(1, 10),
            'product_subtotal' => fake()->randomFloat(2, 1, 1000),
            'order_id' => Order::all()->random()->id,
            'product_id' => Product::all()->random()->id
        ];
    }
}
