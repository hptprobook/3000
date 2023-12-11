<?php

namespace Database\Seeders;

use GuzzleHttp\Client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $client = new Client();

        $headers = [
            'token' => '43176ed6-7fc7-11ee-b394-8ac29577e80e', // Thay thế YOUR_TOKEN_HERE bằng token thực tế của bạn
            'Content-Type' => 'application/json',
        ];

        $response = $client->request('GET', 'https://online-gateway.ghn.vn/shiip/public-api/master-data/province', [
            'headers' => $headers
        ]);

        $provinces = json_decode($response->getBody()->getContents(), true);

        foreach ($provinces['data'] as $province) {
            DB::table('provinceghn')->insert([
                'province_name' => $province['ProvinceName'],
                'id' => $province['ProvinceID'],
            ]);
        }
    }
}
