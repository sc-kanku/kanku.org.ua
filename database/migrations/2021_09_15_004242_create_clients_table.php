<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->integer('id', true);
            $table->dateTime('createdAt')->nullable();
            $table->string('firstName', 40);
            $table->string('lastName', 40);
            $table->smallInteger('gender');
            $table->date('birthday')->nullable();
            $table->smallInteger('status')->nullable()->default(0);
            $table->string('email', 70)->nullable();
            $table->string('password', 20)->nullable();
            $table->decimal('growth', 6)->nullable();
            $table->decimal('weight', 6)->nullable();
            $table->text('aim')->nullable();
            $table->text('special')->nullable();
            $table->text('dosvid')->nullable();
            $table->smallInteger('level')->nullable()->default(0);
            $table->text('comment')->nullable();
            $table->string('code', 21)->nullable()->default('');
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
        Schema::dropIfExists('clients');
    }
}
