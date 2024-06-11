<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    protected $fillable = [
        'name'
    ];

    public $timestamp = false;

    public function getDateCreatedAttribute()
    {
        return $this->created_at->format('Y-m-d'); // Example format
    }
    use HasFactory;
}
