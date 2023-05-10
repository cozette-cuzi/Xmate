<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaginateRequest;
use App\Http\Requests\Post\PostRequest;
use App\Services\PostService;
use Illuminate\Http\Request;

class PostController extends Controller
{
    private $service;

    public function __construct(PostService $service)
    {
        $this->service = $service;
    }

    public function index(PaginateRequest $request)
    {
        return $this->response('success', $this->service->index($request->validated()));
    }

    public function store(PostRequest $request)
    {
        return $this->response('success', $this->service->create($request->validated()));
    }

    public function show($id)
    {
        return $this->response('success', $this->service->show($id));
    }

    public function matedToggle($id)
    {
        return $this->response('success', $this->service->matedToggle($id));
    }

    public function update($id, Request $request)
    {
        $data = $request->validate([
                                       'content' => 'required|string',
                                   ]);
        return $this->response('success', $this->service->update($id, $data));

    }

    public function destroy($id)
    {
        return $this->response('success', $this->service->destroy($id));

    }
}
