<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Contact
 *
 * @property int $id
 * @property int $active
 * @property int $sort
 * @property string|null $position
 * @property string|null $icon
 * @property string|null $headline_ru
 * @property string|null $headline_en
 * @property string|null $source_ru
 * @property string|null $source_en
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $headline
 * @property-read mixed $source
 * @method static \Illuminate\Database\Eloquent\Builder|Contact newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact query()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereHeadlineEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereHeadlineRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereSort($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereSourceEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereSourceRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Contact extends Model
{
    protected $appends = ['headline','source'];

    public function getHeadlineAttribute(){
        return \request()->header('accept-language') ? $this['headline_'.\request()->header('accept-language')] : $this->headline_ru;
    }
    public function getSourceAttribute(){
        return \request()->header('accept-language') ? $this['source_'.\request()->header('accept-language')] : $this->source_ru;
    }
}
