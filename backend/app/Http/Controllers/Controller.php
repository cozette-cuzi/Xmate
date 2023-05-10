<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use \HttpResponse;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function response($message, $data = null, $code = 200)
    {
        return response()->json(['message' => $message, 'data' => $data], $code)
                         ->setEncodingOptions(JSON_NUMERIC_CHECK);
    }
}
