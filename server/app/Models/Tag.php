<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = ['name', "description"];

    public $timestamps = false;

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_tags');
    }
}
