<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news', function (Blueprint $table) {
            $table->integer('id', true);
            $table->tinyInteger('category')->nullable()->default(1);
            $table->date('dateAt')->nullable();
            $table->text('keywords')->comment('for meta-tag');
            $table->string('title', 100)->nullable();
            $table->text('brief')->nullable();
            $table->longText('full')->nullable();
            $table->string('page_dir', 100);
            $table->integer('nid');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news');
    }
}
