<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        $user = User::create($data);
        $user->save();

        return $this->response('success', $user);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
                                       'email'    => 'required|exists:users,email',
                                       'password' => 'required|string'
                                   ]);

        if (!Auth::attempt($data)) {
            return $this->response('Unauthorized.', 401);
        }
        $user              = $request->user();
        $accessToken       = $user->createToken('Personal Access Token')->accessToken;
        $user->accessToken = $accessToken;
        return $this->response('success', $user);
    }

    public function checkAuth()
    {
        $user            = Auth::user();
        $user->groups    = $user->groups;
        $user->interests = $user->interests;
        return $this->response('success', $user);
    }

    public function test()
    {
        $response = Http::attach(
            'file', file_get_contents('dish_1558459115.png'), 'DSdish_1558459115.png'
        )->post('https://caloriesestimation-ap5zqqg3ja-lm.a.run.app');

        return $response;
    }
}
