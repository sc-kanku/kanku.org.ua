<?php

namespace App\Http\Controllers;

use App\Helpers;
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
            $id = ($request->get('id'));
            $field = $request->get('field');
            $value = $request->get('value');

            if ($id == null) {
                $post = Post::createNewDefault();

                if ($field != 'photo') {
                    Post::processPath($field, $value, $post);
                    $post[$field] = $value;
                }

                $result = $post->save();

                if ($field == 'photo') {
                    $result = Post::addPhoto($post->id, $field, $value, $post->getPhotosPath());
                }

                $queryStatus = ["Successful" => $result ? "yes" : "no", "id" => $post->id];
            } else {
                if ($field == 'photo') {
                    $result = Post::addPhoto($id, $field, $value, Post::createNewDefault()->getPhotosPath());
                } else {
                    $postDetails = [$field => $value];
                    Post::processPath($field, $value, $postDetails);

                    $result = Post
                        ::where('id', $id)
                        ->update($postDetails);

                }

                $queryStatus = ["Successful" => $result ? "yes" : "no"];
            }
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

    private function updateDirIfNeeded(Request $request, Post $post) {
        if ($request->get('field') == "title") {
            $post['page_dir'] = Helpers::transliterate($request->get('value'));
        }

        return $post;
    }
    // $this->page_dir = Utils::transliterate($title);
}
