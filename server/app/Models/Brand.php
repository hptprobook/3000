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
        'parent_id',
        'icon_url',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_brands');
    }
}
