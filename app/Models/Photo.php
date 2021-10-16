<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property integer $item_type
 * @property int $gallery_id
 * @property integer $n
 * @property string $title
 * @property string $href
 * @property string $txt
 * @property string $ts
 */
class Photo extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['item_type', 'gallery_id', 'n', 'title', 'href', 'txt', 'ts'];

    public function gallery()
    {
        return $this->belongsTo(Gallery::class);
    }

    public function isPhoto()
    {
        return $this->item_type == 1;
    }

    public function isDescription()
    {
        return $this->item_type == 2;
    }

    private function getWebDir()
    {
        return "/images/galleries/gallery" . $this->gallery_id . '/' . $this->id;
    }

    private function getFsDir()
    {
        return dirname(__FILE__) . '/../../public' . $this->getWebDir();
    }

    public function getWebFullFileName()
    {
        return $this->getWebDir() . '/' . self::getFileNameWithExt($this->getFsDir(), 'photo');
    }

    private function getFsFullFileName()
    {
        return dirname(__FILE__) . '/../../public' . '/' . $this->getWebFullFileName();
    }

    public function getWebFullPreviewFileName()
    {
        return $this->getWebDir() . '/' . self::getFileNameWithExt($this->getFsDir(), 'preview');
    }

    private function getFsFullPreviewFileName()
    {
        return dirname(__FILE__) . '/../../public' . '/' . $this->getWebFullPreviewFileName();
    }

    private static function getFileNameWithExt($path, $fileNamePrefix)
    {
        $fileName = null;

        $ext = Photo::getPhotoExtension($path, $fileNamePrefix);

        if ($ext != '') {
            $fileName = $fileNamePrefix . '.' . $ext;
        }

        return $fileName;
    }

    /*
    public static function getPhotoAndPreview($path)
    {
        $photoAndPreview = array('photo' => '', 'preview' => '');

        $ext = Photo::getPhotoExtension($path, 'photo');

        if ($ext != '') {
            $photoAndPreview['photo'] = 'photo.' . $ext;

            if (file_exists($path . '/preview.' . $ext)) {
                $photoAndPreview['preview'] = 'preview.' . $ext;
            }
        }

        return $photoAndPreview;
    }
*/

    private function getExtension()
    {
        return Photo::getPhotoExtension($this->getFsDir(), 'photo');
    }

    // TODO: move to approrriate place or repace with existing laravel helper function
    private static function getPhotoExtension($path, $photoNamePrefix)
    {
        $photoExtension = '';

        if (file_exists($path)) {
            $exts = array('jpg', 'gif', 'png');

            foreach ($exts as $ext) {
                if (file_exists($path . '/' . $photoNamePrefix . '.' . $ext)) {
                    $photoExtension = $ext;

                    break;
                }
            }
        }

        return $photoExtension;
    }
}
