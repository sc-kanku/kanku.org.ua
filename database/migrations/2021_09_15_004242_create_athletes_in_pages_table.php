<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAthletesInPagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('athletes_in_pages', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('athletID');
            $table->integer('pageID');
            $table->unique(['athletID', 'pageID'], 'athletID');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('athletes_in_pages');
    }
}
