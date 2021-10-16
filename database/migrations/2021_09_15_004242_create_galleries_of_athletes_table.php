<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGalleriesOfAthletesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('galleries_of_athletes', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('athletID')->nullable();
            $table->integer('galleryID')->nullable();
            $table->tinyInteger('is_titles')->default(1);
            $table->timestamp('ts')->useCurrentOnUpdate()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('galleries_of_athletes');
    }
}
