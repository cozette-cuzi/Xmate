<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest as LaravelFormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

abstract class FormRequest extends LaravelFormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    abstract public function rules();

    /**
     * @param Validator $validator
     */
    protected function failedValidation(Validator $validator)
    {
        $errors = (new ValidationException($validator))->errors();
        $message = '';
        foreach ($errors as  $err){
            if($message != '')$message .= ' | ';
            $message .= $err[0];
        }
        throw new HttpResponseException(response()->json(['message' => $message, 'data' => null], 422)
                                                  ->setEncodingOptions(JSON_NUMERIC_CHECK));
    }
}
