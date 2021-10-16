<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('email')->unique('who');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

            $table->string('firstName', 50)->nullable();
            $table->string('lastName', 50)->nullable();
            $table->smallInteger('gender')->nullable();
            $table->integer('role')->nullable()->default(1);
            $table->string('code', 15)->nullable()->default('');
            // $table->tinyInteger('confirmed')->nullable()->default(0);
            // $table->tinyInteger('enabled')->nullable()->default(1);
            $table->string('phone', 20)->nullable();
            // $table->text('comment')->nullable();
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
        Schema::dropIfExists('users');
    }
}
