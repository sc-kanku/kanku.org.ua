<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->integer('id', true);
            $table->dateTime('createdAt')->nullable();
            $table->string('firstName', 30)->nullable();
            $table->string('lastName', 50)->nullable();
            $table->string('email', 70)->nullable();
            $table->string('password', 20)->nullable();
            $table->string('phone', 25)->nullable();
            $table->string('Skype', 30)->nullable();
            $table->smallInteger('role')->nullable();
            $table->smallInteger('enabled')->nullable()->default(1);
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
        Schema::dropIfExists('admins');
    }
}
