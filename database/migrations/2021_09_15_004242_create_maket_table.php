<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMaketTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('maket', function (Blueprint $table) {
            $table->integer('id', true);
            $table->tinyInteger('mobile')->default(0)->comment('Mobile version or not');
            $table->text('shapka')->nullable();
            $table->text('socials')->comment('VK, instagram');
            $table->text('banner_left')->nullable();
            $table->text('bottom')->nullable();
            $table->longText('general')->nullable();
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
        Schema::dropIfExists('maket');
    }
}
