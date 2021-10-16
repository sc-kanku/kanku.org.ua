<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhotosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('photos', function (Blueprint $table) {
            $table->integer('id', true);
            $table->smallInteger('itemType')->nullable()->default(1);
            $table->integer('galleryID')->nullable();
            $table->smallInteger('n')->nullable();
            $table->string('title', 80)->nullable();
            $table->text('href');
            $table->text('txt')->nullable();
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
        Schema::dropIfExists('photos');
    }
}
