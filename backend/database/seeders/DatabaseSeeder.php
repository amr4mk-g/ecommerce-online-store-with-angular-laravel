<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ProductsTableSeeder::class,
            UsersTableSeeder::class,
            OrdersTableSeeder::class
        ]);
        // $this->call(ProductsTableSeeder::class);
        // $this->call(UsersTableSeeder::class);
        // $this->call(OrdersTableSeeder::class);
    }
}
