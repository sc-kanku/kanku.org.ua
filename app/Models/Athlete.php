<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

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
}
