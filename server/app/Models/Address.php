<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Vanthao03596\HCVN\Models\Ward;

class Address extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'phone', 'ward_id', 'address_info', 'note'];

    public $timestamps = false;

    public function ward()
    {
        return $this->belongsTo(Ward::class, 'ward_id', 'id');
    }
}
