<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, 1, 100),
            'stock' => fake()->numberBetween(1, 100),
            'image' => fake()->imageUrl(),
            'category' => fake()->word(),
            'status' => fake()->randomElement(['in', 'out', 'soon']),
        ];
    }
}
