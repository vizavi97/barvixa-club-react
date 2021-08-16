<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Transaction
 *
 * @property int $id
 * @property int $moneyType
 * @property string $moneyValue
 * @property int $cryptoType
 * @property string $cryptoValue
 * @property int $currency
 * @property int $cryptoCurrency
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereCryptoCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereCryptoType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereCryptoValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereMoneyType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereMoneyValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Transaction whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Transaction extends Model
{
   public function currency() {
       return $this->hasOne(Currency::class,'id','currency');
   }
    public function cryptoCurrency() {
        return $this->hasOne(Crypto::class,'id','cryptoCurrency');
    }
}
