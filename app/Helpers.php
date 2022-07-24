<?php

namespace App;

use Exception;

class Helpers
{
    public static function transliterate($str, $code = 'utf-8')
	{
		$str = mb_strtolower($str, $code);
		$str = str_replace(array(
			'?', '!', '.', ',', ':', ';', '*', '(', ')', '{', '}', '%', '#', '№', '@', '$', '^', '-', '+', '/', '\\', '=', '|', '"', '\'', '`', '–', '»', '«',
			'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'з', 'і', 'ї', 'є', 'и', 'й', 'к',
			'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х',
			'ъ', 'ы', 'э', ' ', 'ж', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я'
		), array(
			'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', /*remove bad chars*/
			'a', 'b', 'v', 'g', 'd', 'e', 'e', 'z', 'i', 'yi', 'ye', 'y', 'y', 'k',
			'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h',
			'j', 'i', 'e', '-', 'zh', 'ts', 'ch', 'sh', 'shch',
			'', 'yu', 'ya'
		), $str);

		return $str;
	}

    public static function addPhoto($path, $id, $value) {
        $success = true;

        try {
            self::deletePhotoFileIfExists($path, $id);
            self::createPhotoDirIfNotExists($path, $id);
            self::putUploadedPhotoFileToPhotosDir($path, $id, $value);
        } catch (Exception $e) {
            $success = false;
        }

        return $success;
    }

    private static function deletePhotoFileIfExists($path, $id)
	{
        $dir = $path . '/' . $id;

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

    private static function createPhotoDirIfNotExists($path, $id)
	{
		$dir = $path;

		if (!file_exists($dir)) {
			mkdir($dir);
		}

        $dir .= '/' . $id;

		if (!file_exists($dir)) {
			mkdir($dir);
		}
	}

    private static function putUploadedPhotoFileToPhotosDir($path, $id, $photoBytes)
	{
        $photoSaved = false;
		$dir = $path . '/' . $id;

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

    public static function getPhotoExtension($path, $photoNamePrefix)
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

    /**
     * $suffix = [athletes | dojos | posts]
     */
    public static function getProfilePhotoLocation($suffix, $id)
    {
        // $id = $row['athletID'] ? $row['athletID'] : $row['id'];
        $filename = null;

        $instructorPhotoWebPath = '/images/' . $suffix . '/' . $id;
        $instructorPhotoPath = dirname(__FILE__) . '/../public' . $instructorPhotoWebPath;

        $ext = Helpers::getPhotoExtension($instructorPhotoPath, 'photo');

        if ($ext != '') {
            $filename = $instructorPhotoWebPath . '/photo.' . $ext;
        }

        return $filename;
    }
}
