<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden
        = [
            'password',
            'remember_token',
        ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts
        = [
            'email_verified_at' => 'datetime',
        ];

    public function groups()
    {
        return $this->belongsToMany(Group::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function interests()
    {
        return $this->morphToMany(Interest::class, 'interestables');
    }

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    public function setEmailAttribute($email)
    {
        $this->attributes['email'] = Str::lower($email);
    }

//    public function getImageAttribute($image)
//    {
//        return $image?asset($image, env('HTTPS',FALSE)):null;
//    }

    public function postActions()
    {
        return $this->hasMany(PostAction::class);
    }


}
