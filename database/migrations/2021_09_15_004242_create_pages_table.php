<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('parentID')->nullable();
            $table->integer('itemID')->nullable();
            $table->integer('lng')->nullable();
            $table->integer('cityID')->nullable()->default(0);
            $table->string('className', 40)->nullable();
            $table->text('title')->nullable();
            $table->text('keywords')->nullable();
            $table->text('description')->nullable();
            $table->string('css', 50)->default('-')->comment('Additianal CSS-file');
            $table->string('base', 50)->nullable();
            $table->text('shapka')->nullable();
            $table->text('socials')->comment('VK, instagram');
            $table->text('banner_left')->nullable();
            $table->text('bottom')->nullable();
            $table->longText('content')->nullable();
            $table->string('page_dir', 70)->nullable()->unique('folder');
            $table->string('template', 50)->nullable();
            $table->smallInteger('status')->nullable();
            $table->dateTime('createdAt')->nullable();
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
        Schema::dropIfExists('pages');
    }
}
