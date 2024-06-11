<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item_img extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_id',
        'image_url',
        'is_main',
    ];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
