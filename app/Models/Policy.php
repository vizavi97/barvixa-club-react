<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Policy
 *
 * @property int $id
 * @property int $active
 * @property int $sort
 * @property string|null $headline_ru
 * @property string|null $headline_en
 * @property string|null $text_ru
 * @property string|null $text_en
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $headline
 * @property-read mixed $text
 * @method static \Illuminate\Database\Eloquent\Builder|Policy newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Policy newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Policy query()
 * @method static \Illuminate\Database\Eloquent\Builder|Policy whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Policy whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Policy whereHeadlineEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Policy whereHeadlineRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Policy whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Policy whereSort($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Policy whereTextEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Policy whereTextRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Policy whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Policy extends Model
{
    protected $table = 'policy';

    protected $appends = ['headline','text'];

    public function getHeadlineAttribute(){
        return \request()->header('accept-language') ? $this['headline_'.\request()->header('accept-language')] : $this->headline_ru;
    }
    public function getTextAttribute(){
        return \request()->header('accept-language') ? $this['text_'.\request()->header('accept-language')] : $this->text_ru;
    }
}
