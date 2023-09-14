<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->count(10)->create([
            'cart' => json_encode([
                ['product_id' => 1, 'quantity' => 1],
                ['product_id' => 3, 'quantity' => 1]
            ]),
        ]);

        User::factory()->create([
            'name' => 'Amr',
            'email' => 'amr@example.com',
            'password' => bcrypt('amr@example'),
            'phone' => '1234567890',
            'address' => '123 Main St, Alexandria, Egypt',
            'is_admin' => false
        ]);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('admin@example'),
            'is_admin' => true
        ]);
    }
}
