<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $url
 * @property boolean $place
 * @property string $name
 * @property string $point
 * @property string $district
 * @property string $address
 * @property string $coords
 * @property boolean $is_manual
 * @property string $info
 * @property boolean $is_actual
 */
class Dojo extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['url', 'place', 'name', 'point', 'district', 'address', 'coords', 'is_manual', 'info', 'is_actual'];

    public function athletes()
    {
        return $this->belongsToMany(Athlete::class)->withPivot('schedule', 'schedule_notes');
    }

    public function isLviv()
    {
        return $this->place == 1;
    }

    public function isRegion()
    {
        return $this->place == 2;
    }
}
