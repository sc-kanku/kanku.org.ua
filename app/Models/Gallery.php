<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property boolean $type_id
 * @property string $name
 * @property int $height
 * @property boolean $preview_size
 * @property string $description
 * @property string $ts
 */
class Gallery extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['type_id', 'name', 'height', 'preview_size', 'description', 'ts'];

    public function photos()
    {
        return $this->hasMany(Photo::class);
    }

    public function athletes()
    {
        return $this->belongsToMany(Athlete::class)->withPivot('is_titles');
    }

    public function posts()
    {
        return $this->belongsToMany(Athlete::class)->withPivot('is_titles');
    }
}
