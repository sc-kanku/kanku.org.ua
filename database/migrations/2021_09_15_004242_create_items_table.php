<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->integer('id', true);
            $table->smallInteger('itemType')->nullable()->default(1);
            $table->tinyInteger('restricted')->nullable()->default(0);
            $table->integer('userID')->nullable()->default(0);
            $table->integer('parentID')->nullable()->default(0);
            $table->integer('lng')->nullable()->default(1);
            $table->string('itemName', 100);
            $table->string('href');
            $table->integer('n')->nullable()->default(1);
            $table->integer('nn')->nullable()->default(1);
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
        Schema::dropIfExists('items');
    }
}
