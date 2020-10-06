<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = ['user_id','body'];

    public function user()
    {
        return $this->belongsTo('App\Todo');
    }
}
