<?php

namespace Database\Seeders;

use App\Models\VariantType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VariantTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        VariantType::create(
            [
                'name' => "Màu sắc",
            ]
        );

        VariantType::create(
            [
                'name' => "Kích thước",
            ]
        );
    }
}
