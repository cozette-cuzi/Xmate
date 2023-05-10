<?php

namespace App\Services;

use App\Models\Post;
use App\Models\PostAction;
use Illuminate\Support\Facades\Auth;

class PostActionService extends Service
{
    public function addComment($id, $data)
    {
        $post            = Post::findOrFail($id);
        $data['type']    = 'comment';
        $data['user_id'] = Auth::id();
        return $post->postActions()->create($data);
    }

    public function deleteComment($id)
    {
        return (bool)PostAction::where('id', $id)->where('user_id', Auth::id())->where('type', 'comment')->delete();
    }


    public function likeToggle($id)
    {
        $post       = Post::findOrFail($id);
        $likeAction = $post->postActions()->where('type', 'like')
                           ->where('user_id', Auth::id())
                           ->first();

        if ($likeAction) {
            $likeAction->deleteOrFail();
            return 'You have un-liked the post';
        } else {
            $post->postActions()->create(['type' => 'like', 'user_id' => Auth::id()]);
            return 'You have liked the post';
        }

    }


}
