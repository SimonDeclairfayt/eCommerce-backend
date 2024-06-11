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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('SET NULL');
            $table->timestamps();
            $table->integer('total_price');
            $table->string('order-date');
            $table->string('order-status');
            $table->text('shipping_adress');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
