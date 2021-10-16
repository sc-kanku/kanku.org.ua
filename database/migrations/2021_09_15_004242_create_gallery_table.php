<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGalleryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gallery', function (Blueprint $table) {
            $table->integer('id', true);
            $table->tinyInteger('typeID')->nullable()->default(1);
            $table->string('name', 100)->nullable();
            $table->integer('height')->nullable()->default(500);
            $table->tinyInteger('preview_size')->comment('1 - 200x150 2 - 200x300 3-200x200');
            $table->text('description')->nullable();
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
        Schema::dropIfExists('gallery');
    }
}
