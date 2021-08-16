<?php

use Illuminate\Support\Facades\Route;
use \App\Events\SumsubWebhooks;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::any('/websockets', function () {
    return view('test.websockets');
});

Route::any('/websockets-test', function () {
    try {
        $res = event(new SumsubWebhooks()); //SumsubWebhooks::broadcast('broadcast event sent')
        return  'response from routes'.json_encode($res) ;
    } catch (Exception $error) {
        return $error;
    }

});

Route::any('/test', function () {
    $externalUserId = uniqid();

    $testObject = new \App\Http\Controllers\SumSub\AppToken();

//    $applicantId = $testObject->createApplicant($externalUserId);
//    echo "The applicant was successfully created: " . $applicantId . PHP_EOL;
//
//    $imageId = $testObject->addDocument($applicantId);
//    echo "Identifier of the added document: " . $imageId . PHP_EOL;
//
//    $applicantStatusStr = $testObject->getApplicantStatus($applicantId);
//    echo "Applicant status (json string): " . $applicantStatusStr;

    $accessTokenStr = $testObject->getAccessToken($externalUserId);
    echo "Access token (json string): " . $accessTokenStr;
});

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
