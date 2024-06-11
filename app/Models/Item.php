<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable=[
        'name',
        'description',
        'product_type',
        'stock',
        'price',
        'collection_id',
    ];
    public $timestamp = true;
    public function collection()
    {
        return $this->belongsTo(Collection::class);
    }
}
