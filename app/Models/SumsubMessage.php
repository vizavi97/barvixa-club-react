<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\SumsubMessage
 *
 * @property int $id
 * @property string $method
 * @property string $message
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|SumsubMessage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SumsubMessage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SumsubMessage query()
 * @method static \Illuminate\Database\Eloquent\Builder|SumsubMessage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SumsubMessage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SumsubMessage whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SumsubMessage whereMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SumsubMessage whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class SumsubMessage extends Model
{
    protected $fillable = ['method','message'];

}
