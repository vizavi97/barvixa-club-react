<?php


namespace App\Classes;


class AdminHelper
{
    public static function switcherData(){
        return [
            'on' => ['value' => 1, 'text' => 'Да', 'color' => 'primary'],
            'off' => ['value' => 0, 'text' => 'Нет', 'color' => 'default'],
        ];
    }
}
