<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGymnasiumsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gymnasiums', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('url', 40);
            $table->tinyInteger('place')->default(1)->comment('1 - Lviv 2 - oblast');
            $table->string('name', 60)->nullable();
            $table->string('point', 75)->default('Львів')->comment('City or village');
            $table->string('district', 70);
            $table->text('address')->nullable();
            $table->string('coords', 50)->nullable();
            $table->tinyInteger('is_manual')->nullable()->default(0);
            $table->text('info')->nullable();
            $table->tinyInteger('is_actual')->nullable()->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gymnasiums');
    }
}
