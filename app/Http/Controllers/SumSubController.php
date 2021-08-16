<?php


namespace App\Http\Controllers;


class SumSubController extends Controller
{

    public function getToken(){
        return getenv('SUMSUB_TOKEN');
    }

    public function getKey(){
        return getenv('SUMSUB_KEY');
    }

}
