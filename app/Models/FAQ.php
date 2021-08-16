<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


/**
 * App\Models\FAQ
 *
 * @property int $id
 * @property int $active
 * @property int $sort
 * @property string $headline_ru
 * @property string $headline_en
 * @property string $text_ru
 * @property string $text_en
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $headline
 * @property-read mixed $text
 * @method static \Illuminate\Database\Eloquent\Builder|FAQ newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FAQ newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FAQ query()
 * @method static \Illuminate\Database\Eloquent\Builder|FAQ whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FAQ whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FAQ whereHeadlineEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FAQ whereHeadlineRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FAQ whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FAQ whereSort($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FAQ whereTextEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FAQ whereTextRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FAQ whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class FAQ extends Model
{
    protected $table = 'faqs';
    protected $appends = ['headline','text'];

    public function getHeadlineAttribute(){
        return \request()->header('accept-language') ? $this['headline_'.\request()->header('accept-language')] : $this->headline_ru;
    }

    public function getTextAttribute(){
        return \request()->header('accept-language') ? $this['text_'.\request()->header('accept-language')] : $this->text_ru;
    }
}
