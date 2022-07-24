<?php

namespace App\Models;

use App\Helpers;
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

    public static function createNewDefault() {
        return Dojo::create(array(
            'id' => null,
            'url' => '' . rand(10, 1000000),
            'place' => 0,
            'name' => '',
            'point' => '',
            'district' => '',
            'address' => '',
            'coords' => '',
            'is_manual' => 1,
            'info' => '',
            'is_actual' => 0
        ));
    }

    public static function processPath($field, $value, $dojo) {
        if ($field == "name") {
            $dojo['url'] = Helpers::transliterate($value);
        }

        return $dojo;
    }

    public static function addPhoto($id, $field, $value, $dir) {
        $success = true;

        if ($field == 'photo') {
            $success = Helpers::addPhoto($dir, $id, $value);
        }

        return $success;
    }

    public function getPhotosPath() {
        return dirname(__FILE__) . '/../../public/images/dojos/';
    }

    public function getPhotoPath() {
        return $this->getPhotosPath() . $this->id;
    }

    public function getProfilePhotoLocation()
    {
        return Helpers::getProfilePhotoLocation('dojos', $this->id);
    }

}
