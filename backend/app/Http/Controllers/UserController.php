<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UpdateProfile;
use App\Models\User;
use App\Services\UserService;

class UserController extends Controller
{
    private $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    public function updateProfile(UpdateProfile $request)
    {
        return $this->response('success', $this->service->updateProfile($request->validated()));
    }

    public function show($id)
    {
        return $this->response('success', $this->service->show($id));
    }

}
