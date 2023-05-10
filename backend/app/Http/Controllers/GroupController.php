<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaginateRequest;
use App\Models\Group;
use App\Services\GroupService;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    protected $service;

    public function __construct(GroupService $service)
    {
        $this->service = $service;
    }

    public function index(PaginateRequest $request)
    {
        return $this->response('success', $this->service->index($request->validated()));
    }

    public function show($id)
    {
        return $this->response('success', $this->service->show($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
                                       'name'        => 'required|string',
                                       'description' => 'required|string',
                                       'icon'        => '',
                                       'interest_ids' => 'required|exists:interests,id',
                                   ]);
        return $this->response('success', $this->service->create($data));
    }

    public function attachUser(Group $group)
    {
        return $this->response('success', $this->service->attachUser($group->id));
    }


}
