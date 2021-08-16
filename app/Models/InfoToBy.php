<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\InfoToBy
 *
 * @property int $id
 * @property string|null $text_ru
 * @property string|null $text_en
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $active
 * @method static \Illuminate\Database\Eloquent\Builder|InfoToBy newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InfoToBy newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InfoToBy query()
 * @method static \Illuminate\Database\Eloquent\Builder|InfoToBy whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InfoToBy whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InfoToBy whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InfoToBy whereTextEn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InfoToBy whereTextRu($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InfoToBy whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read mixed $text
 * @property int $sort
 * @method static \Illuminate\Database\Eloquent\Builder|InfoToBy whereSort($value)
 */
class InfoToBy extends Model
{
    protected $table = 'info_to_buy';
    protected $appends = ['text'];

    public function getTextAttribute(){
        return \request()->header('accept-language') ? $this['text_'.\request()->header('accept-language')] : $this->text_ru;
    }
}
