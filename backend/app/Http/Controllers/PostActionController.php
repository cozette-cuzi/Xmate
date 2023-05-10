<?php

namespace App\Http\Controllers;

use App\Http\Requests\Post\CommentRequest;
use App\Services\PostActionService;

class PostActionController extends Controller
{
    private $service;

    public function __construct(PostActionService $service)
    {
        $this->service = $service;
    }

    public function addComment($id, CommentRequest $request)
    {
        return $this->response('success', $this->service->addComment($id,$request->validated()));
    }

    public function deleteComment($id)
    {
        return $this->response('success', $this->service->deleteComment($id));
    }

    public function likeToggle($id)
    {
        return $this->response($this->service->likeToggle($id));
    }
}
