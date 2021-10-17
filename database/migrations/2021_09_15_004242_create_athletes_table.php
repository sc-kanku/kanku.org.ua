<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAthletesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('athletes', function (Blueprint $table) {
            $table->integer('id', true);
            $table->string('email', 70)->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password', 16)->default('');
            $table->rememberToken();
            $table->timestamps();
            $table->tinyInteger('is_coach')->default(0);
            $table->tinyInteger('is_actual')->default(1);
            $table->tinyInteger('is_best')->default(0);
            $table->tinyInteger('show_in_blacks')->default(1)->comment('wheather athlet is shown in black belts page');
            $table->string('firstName', 25)->nullable();
            $table->string('lastName', 25)->nullable();
            $table->string('patronymic', 50)->default('');
            $table->string('page_dir', 50)->comment('for address');
            $table->integer('degree')->nullable();
            $table->date('birthday')->nullable();
            $table->text('brief')->nullable();
            $table->text('briefBest')->nullable();
            $table->text('full')->nullable();
            $table->string('phone', 25)->default('');
            $table->string('phone2', 25)->nullable();
            $table->string('twitter', 75)->nullable();
            $table->string('facebook', 75)->nullable();
            $table->string('vk', 50)->nullable()->default('');
            $table->string('lj', 75)->nullable();
            $table->string('ok', 75)->nullable()->comment('odnoklassniki');
            $table->string('youtube', 75)->nullable();
            $table->string('instagram', 75)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('athletes');
    }
}
