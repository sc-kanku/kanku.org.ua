<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Helpers;

/**
 * @property int $id
 * @property boolean $is_coach
 * @property boolean $is_actual
 * @property boolean $is_best
 * @property boolean $show_in_blacks
 * @property string $firstName
 * @property string $lastName
 * @property string $patronymic
 * @property string $page_dir
 * @property boolean $degree
 * @property string $birthday
 * @property string $brief
 * @property string $briefBest
 * @property string $full
 * @property string $phone
 * @property string $phone2
 * @property string $email
 * @property string $password
 * @property string $twitter
 * @property string $facebook
 * @property string $vk
 * @property string $lj
 * @property string $ok
 * @property string $youtube
 * @property string $instagram
 */
class Athlete extends Authenticatable
{
    use Notifiable;

    /**
     * @var array
     */
    protected $fillable = ['is_coach', 'is_actual', 'is_best', 'show_in_blacks', 'firstName', 'lastName', 'patronymic', 'page_dir', 'degree', 'birthday', 'brief', 'briefBest', 'full', 'phone', 'phone2', 'email', 'password', 'twitter', 'facebook', 'vk', 'lj', 'ok', 'youtube', 'instagram'];


    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function dojos()
    {
        return $this->belongsToMany(Dojo::class)->withPivot('schedule', 'schedule_notes');
    }

    public function galleries()
    {
        return $this->belongsToMany(Gallery::class)->withPivot('is_titles');
    }

    public function photos()
    {
        return $this->gallery()->photos();
    }

    public function roles()
    {
        return $this
            ->belongsToMany(Role::class)
            ->withTimestamps();
    }

    public function authorizeRoles($roles)
    {
        if ($this->hasAnyRole($roles)) {
            return true;
        }
        abort(401, 'This action is unauthorized.');
    }

    public function hasAnyRole($roles)
    {
        if (is_array($roles)) {
            foreach ($roles as $role) {
                if ($this->hasRole($role)) {
                    return true;
                }
            }
        } else {
            if ($this->hasRole($roles)) {
                return true;
            }
        }

        return false;
    }

    public function hasRole($role)
    {
        if ($this->roles()->where('name', $role)->first()) {
            return true;
        }

        return false;
    }

    public function getDegreeLabel()
    {
        $degrees = array(
            '-10' => '10-й кю', '-9' => '9-й кю', '-8' => '8-й кю', '-7' => '7-й кю', '-6' => '6-й кю', '-5' => '5-й кю', '-4' => '4-й кю', '-3' => '3-й кю', '-2' => '2-й кю', '-1' => '1-й кю', '1' => '1-й дан', '2' => '2-й дан', '3' => '3-й дан', '4' => '4-й дан', '5' => '5-й дан', '6' => '6-й дан'
        );

        return $degrees[$this->degree];
    }

    public function getProfilePhotoLocation()
    {
        // $id = $row['athletID'] ? $row['athletID'] : $row['id'];
        $filename = null;

        $instructorPhotoPath = '/images/athletes/' . $this->id;
        $instructorPhotoFolder = dirname(__FILE__) . '/../../public' . $instructorPhotoPath;

        $ext = Athlete::getPhotoExtension($instructorPhotoFolder, 'photo');

        if ($ext != '') {
            $filename = $instructorPhotoPath . '/photo.' . $ext;
        }

        return $filename;
    }


    // TODO: move to utils
    private static function getPhotoExtension($path, $photoNamePrefix)
    {
        $photoExtension = '';

        // dd($path);
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

    /*
    public static function boot()
	{
	    parent::boot();

	    static::updated(function ($model) {
	        Artisan::call("page-cache:clear $model->slug");
	    });
	}
     */

    public static function createNewDefault() {
        return Athlete::create(array(
            'id' => null,
            'is_coach' => 1,
            'is_actual' => 1,
            'is_best' => 0,
            'show_in_blacks' => 0,
            'firstName' => '',
            'lastName' => '',
            'patronymic' => '',
            'page_dir' => '' . rand(10, 1000000),
            'degree' => 1,
            'birthday' => '2000-01-01',
            'brief' => '',
            'briefBest' => '',
            'full' => '',
            'phone' => '',
            'phone2' => '',
            'email' => '',
            'password' => '',
            'twitter' => '',
            'facebook' => '',
            'youtube' => '',
            'instagram' => ''
        ));
    }

    public function processPath($field, $value) {
        $pageDir = '';

        if ($this->id == null) {
            if ($field == "firstName" || $field == "lastName" || $field == "patronymic") {
                $pageDir = Helpers::transliterate($value);
            }
        } else {
            switch ($field) {
                case "firstName" :
                    $pageDir = $this['lastName']
                        . ( $value  ? ' ' . $value : '')
                        . ( $this['patronymic']
                            ? ( ' ' . $this['patronymic'] )
                            : '');
                    break;
                case "lastName" :
                    $pageDir = $value
                        . ( $this['firstName']
                            ? (' ' . $this['firstName'])
                            : '')
                        . ($this['patronymic']
                            ? (' ' . $this['patronymic'])
                            : '');
                    break;
                case "patronymic" :
                    $pageDir = $this['lastName']
                        . ($this['firstName']
                            ? (' ' . $this['firstName'])
                            : '')
                        . ($value  ? ' ' . $value : '') ;
                    break;
            }
        }

        if ($pageDir) {
            $this['page_dir'] = Helpers::transliterate($pageDir);
        }
    }

    public static function processPhoto($id, $param, $value) {
        $success = true;
        $athlete = Athlete::createNewDefault();
        $athlete->id = $id;

        if ($param == 'photo') {
            $athlete->deletePhotoFileIfExists();
            $athlete->createPhotoDirIfNotExists();
            $success = $athlete->putUploadedPhotoFileToPhotosDir($value);
        }

        return $success;
    }

    private function PHOTO_PATH(){
        return dirname(__FILE__) . '/../../public/images/athletes/';
    }

    private function deletePhotoFileIfExists()
	{
        // $dir = dirname(__FILE__) . '/../../public/images/athletes/' . $this->id;
        $dir = $this->PHOTO_PATH() . $this->id;

		if (file_exists($dir) && $handle = opendir($dir)) {
			while (false !== ($file = readdir($handle))) {
				if (($file != ".") && ($file != "..")) {
					if (is_file($dir . "/" . $file)) {
						chmod($dir . "/" . $file, 0777);
						unlink($dir . "/" . $file);
					}
				}
			}

			closedir($handle);
		}
	}

    private function createPhotoDirIfNotExists()
	{
		$dir = $this->PHOTO_PATH();

		if (!file_exists($dir)) {
			mkdir($dir);
		}

        $dir .= '/' . $this->id;

		if (!file_exists($dir)) {
			mkdir($dir);
		}
	}

    private function putUploadedPhotoFileToPhotosDir($photoBytes)
	{
        $photoSaved = false;
		$dir = $this->PHOTO_PATH() . $this->id;;

        preg_match("/^data:(.*,)?/", $photoBytes, $extensionPrefix);

        if ($extensionPrefix != []) {
            preg_match("/(png|jpeg|jpg|gif)/", $extensionPrefix[0], $fileExtension);

            if ($fileExtension != null && $fileExtension != []) {
                $fileExtension = $fileExtension[0];

                $dir = $dir . '/photo.' . $fileExtension;
                $photoFile = fopen($dir, "w");

                $photoBytes = preg_replace("/^data:(.*,)?/", "", $photoBytes);
                $photoBytes = utf8_encode($photoBytes);
                $photoBytes = base64_decode($photoBytes);

                fwrite($photoFile, $photoBytes);
                fclose($photoFile);

                $photoSaved = true;
            }
        }

        return $photoSaved;
	}
}
