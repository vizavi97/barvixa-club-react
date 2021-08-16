<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('active')->default('1');
            $table->integer('sort')->default('100');
            $table->string('position')->nullable();
            $table->string('icon')->nullable();
            $table->string('headline_ru')->nullable();
            $table->string('headline_en')->nullable();
            $table->string('source_ru')->nullable();
            $table->string('source_en')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacts');
    }
}
