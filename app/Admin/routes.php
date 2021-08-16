<?php

use Illuminate\Routing\Router;

Admin::routes();

Route::group([
    'prefix'        => config('admin.route.prefix'),
    'namespace'     => config('admin.route.namespace'),
    'middleware'    => config('admin.route.middleware'),
    'as'            => config('admin.route.prefix') . '.',
], function (Router $router) {

    $router->get('/', 'HomeController@index')->name('home');
    $router->resource('/advantages', AdvantageController::class);
    $router->resource('/packages', PackageController::class);
    $router->resource('/info_to_buy', InfoToByController::class);
    $router->resource('/road', RoadController::class);
    $router->resource('/currency', CurrencyController::class);
    $router->resource('/crypto', CryptoController::class);
    $router->resource('/instructions', InstructionController::class);
    $router->resource('/faq', FAQController::class);
    $router->resource('/policy', PolicyController::class);
    $router->resource('/contact', ContactController::class);
    $router->resource('/language', LangController::class);

});
