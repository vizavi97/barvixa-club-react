<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Package
 *
 * @property int $id
 * @property string|null $pay
 * @property string|null $get
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Package newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Package newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Package query()
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereGet($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Package wherePay($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int $active
 * @property string|null $money_value
 * @property string|null $crypto_value
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereCryptoValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereMoneyValue($value)
 * @property int $sort
 * @property int $currency
 * @property int $crypto
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereCrypto($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereSort($value)
 */
class Package extends Model
{}
