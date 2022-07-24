<?php

namespace App\Models;

use App\Helpers;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property boolean $category
 * @property string $dateAt
 * @property string $keywords
 * @property string $title
 * @property string $brief
 * @property string $full
 * @property string $page_dir
 * @property int $nid
 */
class Post extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['category', 'dateAt', 'keywords', 'title', 'brief', 'full', 'page_dir', 'nid'];

    public function galleries()
    {
        return $this->belongsToMany(Gallery::class)->withPivot('is_titles');
    }

    function getPhotoAndPreviewFileNames()
    {
        $photo = '';
        $preview = '';
        $dir = dirname(__FILE__) . '/../../public/images/posts/' . $this->id;

        if (file_exists($dir)) {
            $exts = array('jpeg','jpg', 'gif', 'png');

            foreach ($exts as $ext) {
                if (file_exists($dir . '/photo.' . $ext)) {
                    $photo = 'photo.' . $ext;

                    if (file_exists($dir . '/middle.' . $ext)) {
                        $preview = 'middle.' . $ext;
                    }

                    break;
                }
            }
        }

        return array(
            "photo" => $photo,
            "preview" => $preview
        );
    }

    public static function createNewDefault() {
        return Post::create(array(
            'category' => 0,
            'dateAt' => '2022-02-23',
            'keywords' => '',
            'title' => '',
            'brief' => '',
            'full' => '',
            'page_dir' => '' . rand(10, 1000000),
            'nid' => 0
        ));
    }

    public static function processPath($field, $value, $post) {
        if ($field == "title") {
            $post['page_dir'] = Helpers::transliterate($value);
        }

        return $post;
    }

    public static function addPhoto($id, $field, $value, $dir) {
        $success = true;

        if ($field == 'photo') {
            $success = Helpers::addPhoto($dir, $id, $value);
        }

        return $success;
    }

    public function getPhotosPath() {
        return dirname(__FILE__) . '/../../public/images/posts';
    }

    public function getPhotoPath() {
        return $this->getPhotosPath() . '/' . $this->id;
    }

    public function getProfilePhotoLocation()
    {
        return Helpers::getProfilePhotoLocation('posts', $this->id);
    }
}
