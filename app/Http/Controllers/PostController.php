<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Exception;

class PostController extends Controller
{
    public function index()
    {

        $posts = Post
            ::orderByDesc("id")
            ->paginate(10);
        /*
        $regionDojos = Dojo
            ::where('is_actual', '=', 1)
            ->where('place', '=', 2)
            ->get();
*/
        return view('guest.posts.list', [
            'posts' => $posts
        ]);
    }


    public function details($dojoKeyword)
    {
        $post = Post::where('page_dir', $dojoKeyword)->first();

        if ($post !== null) {
            return view('guest.posts.post', [
                'post' => $post
            ]);
        } else {
            return view('guest.posts.postNotFound', [
                'post' => $post
            ]);
        }
    }


    public function apiPosts()
    {
        return Post::get();
    }

    public function apiUpdatePost(Request $request)
    {
        try {
            // TODO: degeree is not saved in inline editing.
            $result = Post
                ::where('id', $request->get('id'))
                ->update([$request->get('field') => $request->get('value')]);

            $queryStatus = ["Successful" => $result];
        } catch (Exception $e) {
            $queryStatus = ["Unsuccessful" => $e];
        }

        return $queryStatus;
    }

    public function apiEditPost($id)
    {
        $post = Post::where('id', $id)->/*with('dojos')->*/get()->first();

        return $post;
    }

    public function apiSavePost(Request $request, $id)
    {
        $data = $request->all();

        $result = Post::find($id)->update($data);

        return $result;
    }
}
