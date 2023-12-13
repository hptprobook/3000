<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'name',
        'icon_url',
    ];

    public function products()
    {
        return $this->belongsTo(Product::class);
    }
}
