<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Advantage
 *
 * @property int $id
 * @property int $active
 * @property string $slug
 * @property string|null $title_ru
 * @property string|null $title_en
 * @property string|null $intro_ru
 * @property string|null $intro_en
 * @property string|null $text_ru
 * @property string|null $text_en
 * @property string|null $icon
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Advantage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Advantage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Advantage query()
 * @method static \Illuminate\Database\Eloquent\Builder|Advantage whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advantage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advantage whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advantage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advantage whereIntroEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advantage whereIntroRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advantage whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advantage whereTextEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advantage whereTextRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advantage whereTitleEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advantage whereTitleRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Advantage whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read mixed $headline
 * @property-read mixed $text
 * @property int $sort
 * @method static \Illuminate\Database\Eloquent\Builder|Advantage whereSort($value)
 */
class Advantage extends Model
{
    protected $appends = ['headline','text'];

    public function getHeadlineAttribute($value){
        return \request()->header('accept-language') ? $this['title_'.\request()->header('accept-language')] : $this->title_ru;
    }

    public function getTextAttribute(){
        return \request()->header('accept-language') ? $this['intro_'.\request()->header('accept-language')] : $this->intro_ru;
    }
}
