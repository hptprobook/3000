<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'description',
        'start_date',
        'end_date',
        'amount',
        'quantity',
        'type'
    ];

    public $timestamps = false;
}
