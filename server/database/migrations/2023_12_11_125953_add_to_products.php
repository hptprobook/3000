<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedTinyInteger('height')->after('seller_id');
            $table->unsignedTinyInteger('width')->after('seller_id');
            $table->unsignedTinyInteger('length')->after('seller_id');
            $table->unsignedTinyInteger('weight')->after('seller_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('height', 'weight', 'width', 'length');
        });
    }
};
