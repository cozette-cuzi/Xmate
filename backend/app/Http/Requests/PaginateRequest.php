<?php

namespace App\Http\Requests;

/**
 * @property mixed page_size
 */
class PaginateRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'page'            => 'numeric|required|min:1',
            'page_size'       => 'numeric|required|min:1',
            'filter'          => 'nullable',
            'filter.type'     => 'nullable|string',
            'filter.group_id' => 'nullable|numeric|exists:groups,id',
            'filter.user_id'  => 'nullable|numeric|exists:users,id',

            'filter_type' => 'nullable|string',
            'group_id'    => 'nullable|numeric|exists:groups,id',
            'user_id'     => 'nullable|numeric|exists:users,id',
        ];
    }
}
