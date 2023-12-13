<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'price', 'discount', 'short_desc', 'detail', 'thumbnail', 'category_id', 'status', 'quantity', 'sold', 'brand_id', 'weight', 'length', 'width', 'height'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'product_tags');
    }

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }

    public function variants()
    {
        return $this->belongsToMany(VariantType::class, 'product_variants')
            ->withPivot(['value', 'price']);
    }
}
