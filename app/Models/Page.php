<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $parentID
 * @property int $itemID
 * @property int $lng
 * @property int $cityID
 * @property string $className
 * @property string $title
 * @property string $keywords
 * @property string $description
 * @property string $css
 * @property string $base
 * @property string $shapka
 * @property string $socials
 * @property string $banner_left
 * @property string $bottom
 * @property string $content
 * @property string $page_dir
 * @property string $template
 * @property integer $status
 * @property string $createdAt
 * @property string $ts
 */
class Page extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['parentID', 'itemID', 'lng', 'cityID', 'className', 'title', 'keywords', 'description', 'css', 'base', 'shapka', 'socials', 'banner_left', 'bottom', 'content', 'page_dir', 'template', 'status', 'createdAt', 'ts'];

    public function galleries()
    {
        return $this->belongsToMany(Gallery::class)->withPivot('is_titles');
    }
}
