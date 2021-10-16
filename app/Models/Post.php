<?php

namespace App\Models;

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
            $exts = array('jpg', 'gif', 'png');

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
}
