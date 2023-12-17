<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddressGhn extends Model
{
    use HasFactory;

    protected $table = 'provinceghn';

    protected $fillable = ['province_name'];

    public $timestamps = false;
}
