<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders_item extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'item_id',
        'quantity',
    ];
    public function order()
    {
        return $this->belongsTo(Orders::class, 'order_id');
    }
    public function product()
    {
        return $this->belongsTo(Item::class, 'item_id');
    }
}
