<?php

namespace App\Services;

use App\Models\Group;
use App\Models\Interestable;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class GroupService extends Service
{
    public function index($data): ?array
    {
        $groups = Group::with('interests')->paginate($data['page_size']);
        return $this->handlePaginate($groups, 'groups');
    }

    public function create($data)
    {
        $interests = $data['interest_ids'];
        unset($data['interest_ids']);

        $res = Group::create($data);

        foreach ($interests as $id) {
            Interestable::create(['interestables_id'   => $res->id,
                                  'interestables_type' => 'App\Models\Group',
                                  'interest_id'        => $id]);
        }
        $res->load('interests');

        return $res;
    }

    public function attachUser($group_id)
    {
        Group::find($group_id)->users()->syncWithoutDetaching(Auth::id());
        return true;
    }

    public function destroy($id): bool
    {
        if (count(Post::where('group_id', $id)->get()) > 0) {
            return "You can't delete this group because it has many posts!";
        } else {
            return Group::where('id', $id)->delete();
        }
    }

    public function show($id)
    {
        return Group::findOrFail($id);
    }
}
