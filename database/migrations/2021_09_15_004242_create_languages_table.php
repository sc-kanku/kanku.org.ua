<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLanguagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('languages', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('english', 20)->nullable();
            $table->string('native', 20)->nullable();
            $table->string('meta', 5)->nullable();
            $table->text('rss_title')->nullable();
            $table->text('rss_link')->nullable();
            $table->text('rss_description')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('languages');
    }
}
