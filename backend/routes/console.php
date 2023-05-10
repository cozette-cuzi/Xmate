<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Artisan::command('go', function () {

    Artisan::call('optimize');
    Artisan::call('migrate');
    Artisan::call('passport:install');

    echo "Database is ready, go go 🌠🌠!";
})->describe('Migrate with passport!');


Artisan::command('go-all', function () {

    Artisan::call('optimize');
    Artisan::call('db:wipe');
    Artisan::call('migrate');
    Artisan::call('passport:install');
    Artisan::call('db:seed');

    echo "Database is ready, go go 🌠🌠!";
})->describe('Migrate with passport and seeds!');

Artisan::command('seed-all', function () {
    // exec('cd dash-tenancy && composer dump-autoload');
    Artisan::call('db:seed');

    echo "All Seeders has been seede :3 🌠🌠!";
})->describe('Seed Seed!!');
