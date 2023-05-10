<?php

namespace App\Services;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PostService extends Service
{
    public function index($data): ?array
    {
        $posts = Post::selectShow()
            ->with(['likes', 'comments'])->filter($data['filter'] ?? null, $data['filter_type'] ?? null, $data['user_id'] ?? null, $data['group_id'] ?? null)
            ->get();
        try {
            $ids = (new UserService())->getRecommendations(Auth::id());
        } catch (\Exception $e) {
            $ids = [];
        }

        $data = $posts->toArray();
        $mappedArray = [];
        foreach ($ids as $id) {
            $mappedArray[$id] = array_filter($data, function ($value) use ($id) {
                return $value['user_id'] == $id;
            });
        }
        $mappedArray = array_filter($mappedArray, function ($value) {
            return sizeof($value) > 0;
        });
        $mappedArray = array_values($mappedArray);
        $res = [];
        while (sizeof($mappedArray)) {
            foreach ($mappedArray as $key => $item) {
                $mappedArray[$key] = array_values($mappedArray[$key]);
                if (sizeof($mappedArray[$key]) == 0) {
                    unset($mappedArray[$key]);
                    continue;
                }
                $post = reset($mappedArray[$key]);
                $res[] = $post;
                array_shift($mappedArray[$key]);
            }
        }

        foreach ($posts as $post) {
            if (!in_array($post->user_id, $ids)) {
                $res[] = $post;
            }
        }
//
        return [
            'posts' => collect($res),
            'last_page' => 1,
        ];
    }

    public function create($data): Post
    {
        $post = Auth::user()->posts()->create($data);
        (new GroupService())->attachUser($data['group_id']);
        return $this->show($post->id);
    }

    public function show($id): Post
    {
        return Post::where('posts.id', $id)
            ->selectShow()
            ->with(['likes', 'comments'])
            ->first();
    }


    public function update($id, $data): Post
    {
        $post = Post::findOrFail($id);
        $post->update(['content' => $data['content']]);
        return $this->show($id);
    }

    public function destroy($id): bool
    {
        return (bool)Post::where('id', $id)->delete();
    }

    public function matedToggle($id)
    {
        $post = Post::where('posts.id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $post->update(['is_mated' => !$post->is_mated]);
        return true;
    }

}
