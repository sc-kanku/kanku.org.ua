<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGymnasiumsInPagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gymnasiums_in_pages', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('gymnasiumID');
            $table->integer('pageID');
            $table->unique(['gymnasiumID', 'pageID'], 'gymnasium');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gymnasiums_in_pages');
    }
}
