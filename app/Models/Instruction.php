<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Instruction
 *
 * @property int $id
 * @property int|null $active
 * @property string|null $sort
 * @property string|null $headline_ru
 * @property string|null $text_ru
 * @property string|null $headline_en
 * @property string|null $text_en
 * @property string|null $number
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $headline
 * @property-read mixed $text
 * @method static \Illuminate\Database\Eloquent\Builder|Instruction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Instruction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Instruction query()
 * @method static \Illuminate\Database\Eloquent\Builder|Instruction whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instruction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instruction whereHeadlineEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instruction whereHeadlineRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instruction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instruction whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instruction whereSort($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instruction whereTextEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instruction whereTextRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Instruction whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Instruction extends Model
{
    protected $appends = ['headline','text'];

    public function getHeadlineAttribute(){
        return \request()->header('accept-language') ? $this['headline_'.\request()->header('accept-language')] : $this->headline_ru;
    }
    public function getTextAttribute(){
        return \request()->header('accept-language') ? $this['text_'.\request()->header('accept-language')] : $this->text_ru;
    }
}
