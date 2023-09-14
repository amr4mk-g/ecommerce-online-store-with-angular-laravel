<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_number' => fake()->unique()->randomNumber(8),
            'customer_name' => fake()->name(),
            'customer_email' => fake()->unique()->safeEmail(),
            'customer_phone' => fake()->phoneNumber(),
            'customer_address' => fake()->address(),
            'order_total' => fake()->randomFloat(2, 10, 500),
            'order_status' => fake()->randomElement(['pending', 'shipped', 'delivered', 'canceled']),
            'order_date' => fake()->dateTimeThisMonth(),
            'user_id' => User::all()->random()->id
        ];
    }
}
