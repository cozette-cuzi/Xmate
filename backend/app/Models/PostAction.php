<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostAction extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $hidden = ['updated_at'];

    public function scopeSelectShow($query)
    {
        $query->select('post_actions.*','users.name as user_name','users.image');
    }

    public function scopeJoins($query)
    {
        return $query->join('users','users.id','=','post_actions.user_id');
    }
}
