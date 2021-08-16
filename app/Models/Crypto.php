<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\CryptoCurrency
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string $numeric
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $active
 * @property int $sort
 * @property string|null $icon
 * @method static \Illuminate\Database\Eloquent\Builder|Crypto newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Crypto newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Crypto query()
 * @method static \Illuminate\Database\Eloquent\Builder|Crypto whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crypto whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crypto whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crypto whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crypto whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crypto whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crypto whereNumeric($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crypto whereSort($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Crypto whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Crypto extends Model
{
}
