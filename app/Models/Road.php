<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\RoadMap
 *
 * @property int $id
 * @property int $active
 * @property string|null $text_ru
 * @property string|null $text_en
 * @property string $position
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Road newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Road newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Road query()
 * @method static \Illuminate\Database\Eloquent\Builder|Road whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Road whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Road whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Road wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Road whereTextEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Road whereTextRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Road whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read mixed $text
 * @property int $sort
 * @method static \Illuminate\Database\Eloquent\Builder|Road whereSort($value)
 */
class Road extends Model
{
    protected $table = 'road_maps';
    protected $appends = ['text'];

    public function getTextAttribute() {
        return \request()->header('accept-language') ? $this['text_'.\request()->header('accept-language')] : $this->text_ru;
    }
}
