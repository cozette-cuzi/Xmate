<?php

namespace App\Http\Controllers;

use App\Models\Interest;
use App\Services\UserService;
use Illuminate\Support\Facades\Http;

class HelpController extends Controller
{
    public function interests(): \Illuminate\Http\JsonResponse
    {
        $interests = Interest::all();
        return $this->response('success', $interests);
    }

    public function data2Excel()
    {
       return (new UserService())->getRecommendations();
    }

}
