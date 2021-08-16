<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Lang
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Lang newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lang newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lang query()
 * @method static \Illuminate\Database\Eloquent\Builder|Lang whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lang whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lang whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lang whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lang whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Lang extends Model
{}
