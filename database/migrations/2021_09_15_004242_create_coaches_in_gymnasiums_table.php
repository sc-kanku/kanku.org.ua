<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoachesInGymnasiumsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coaches_in_gymnasiums', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('athletID')->nullable();
            $table->integer('gymnasiumID')->nullable();
            $table->text('schedule')->nullable();
            $table->text('schedule_notes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('coaches_in_gymnasiums');
    }
}
