<?php

namespace App\Http\Requests\User;

use App\Http\Requests\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateProfile extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'           => 'string|min:3',
            'email'          => 'string|email|unique:users,email,' . Auth::id(),
            'password'       => 'confirmed|min:6|string',
            'birthday'       => 'date|before:-18 years',
            'gender'         => 'in:MALE,FEMALE',
            'interest_ids'   => 'array',
            'interest_ids.*' => 'exists:interests,id',
            'image'          => 'nullable|image',
        ];
    }
}
