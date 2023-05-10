<?php

namespace App\Http\Requests\Post;

use App\Http\Requests\FormRequest;

class CommentRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'content' => 'required|string|max:500',
        ];
    }
}
