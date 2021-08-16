<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\SumSubController;
use App\Http\Controllers\SumSub\AppToken;
use App\Http\Controllers\SumSub\WebhooksController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'sumsub'
], function ($router) {
    Route::get('/token', function () {
        $externalUserId = uniqid();
        $testObject = new \App\Http\Controllers\SumSub\AppToken();
        return $testObject->getAccessToken($externalUserId);
    } ); // [AppToken::class, 'getToken']
    Route::get('/key', [SumSubController::class, 'getKey']);
});

Route::group([
    'prefix' => 'content'
], function ($router) {
    Route::get('/advantages', [ContentController::class, 'advantages']);
    Route::get('/packages', [ContentController::class, 'packages']);
    Route::get('/slider', [ContentController::class, 'slider']);
    Route::get('/road-map', [ContentController::class, 'roadMap']);
    Route::get('/transactions', [ContentController::class, 'transactions']);
    Route::get('/instructions', [ContentController::class, 'instructions']);
    Route::get('/faq', [ContentController::class, 'faq']);
    Route::get('/policy', [ContentController::class, 'policy']);
    Route::get('/contact', [ContentController::class, 'contact']);
    Route::get('/lang', [ContentController::class, 'lang']);
    Route::get('/currencies', [ContentController::class, 'currencies']);
    Route::get('/crypto', [ContentController::class, 'crypto']);
    Route::get('/test', function (){
        return \request()->header('accept-language');
    });
});

Route::group(['prefix' => 'sumsub-webhooks'], function ($router) {
    Route::any('applicantCreated', [WebhooksController::class,'applicantCreated']);
    Route::any('applicantPending', [WebhooksController::class,'applicantPending']);
    Route::any('applicantReviewed', [WebhooksController::class,'applicantReviewed']);
    Route::any('applicantOnHold', [WebhooksController::class,'applicantOnHold']);
    Route::any('applicantActionPending', [WebhooksController::class,'applicantActionPending']);
    Route::any('applicantActionReviewed', [WebhooksController::class,'applicantActionReviewed']);
    Route::any('applicantActionOnHold', [WebhooksController::class,'applicantActionOnHold']);
    Route::any('applicantPrechecked', [WebhooksController::class,'applicantPrechecked']);
    Route::any('applicantDeleted', [WebhooksController::class,'applicantDeleted']);
    Route::any('applicantReset', [WebhooksController::class,'applicantReset']);
});
