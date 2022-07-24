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
            // dump($e);
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

        $PHOTO_FILE_PREFIX = 'photo';
        $MIDDLE_FILE_PREFIX = 'middle';
        $PREVIEW_FILE_PREFIX = 'preview';

        $MIDDLE_WIDTH = 745;
        $PREVIEW_WIDTH = 250;

		$dir = $path . '/' . $id;

        preg_match("/^data:(.*,)?/", $photoBytes, $extensionPrefix);

        if ($extensionPrefix != []) {
            preg_match("/(png|jpeg|jpg|gif)/", $extensionPrefix[0], $fileExtension);

            if ($fileExtension != null && $fileExtension != []) {
                $fileExtension = $fileExtension[0];

                $originalFullName = $dir . '/' . $PHOTO_FILE_PREFIX . '.' . $fileExtension;
                $photoFile = fopen($originalFullName, "w");

                $photoBytes = preg_replace("/^data:(.*,)?/", "", $photoBytes);
                $photoBytes = utf8_encode($photoBytes);
                $photoBytes = base64_decode($photoBytes);

                fwrite($photoFile, $photoBytes);
                fclose($photoFile);

                $photoSaved = true;

		        $middleFullName = $dir . '/' . $MIDDLE_FILE_PREFIX . '.' . $fileExtension ;
		        $previewFullName = $dir . '/' . $PREVIEW_FILE_PREFIX . '.' . $fileExtension;

                $photoSaved &= self::resizeImage($originalFullName, $previewFullName, $PREVIEW_WIDTH);
		        $photoSaved &= self::resizeImage($originalFullName, $middleFullName, $MIDDLE_WIDTH);
            }
        }

        return $photoSaved;
	}

    public static function getPhotoExtension($path, $photoNamePrefix)
    {
        $photoExtension = '';

        if (file_exists($path)) {
            $exts = array('jpeg', 'jpg', 'gif', 'png');

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

    private static function resizeImage($originalPath, $targetPath, $targetWidth)
	{
        $success = true;

		if (!function_exists("imagecopyresampled")) {
			return false;//"GD2 is not loaded";
		}

		$info = getimagesize($originalPath);

		if ($info === false) {
			return false;//"$originalPath is not image";
		}

		if ($info[2] == IMAGETYPE_GIF) {
			$originalImage = imagecreatefromgif($originalPath);
		} elseif ($info[2] == IMAGETYPE_JPEG) {
			$originalImage = imagecreatefromjpeg($originalPath);
		} elseif ($info[2] == IMAGETYPE_PNG) {
			$originalImage = imagecreatefrompng($originalPath);
		} else {
            return false;
			// return "Формат исходного файла не поддерживается";
		}

		$width = $info[0];
		$height = $info[1];

		if ($targetWidth > $width) {
            $targetWidth = $width;
        }

		$targetHeight = ceil($height * $targetWidth / $width);

		if (($targetWidth == $width) && ($targetHeight == $height) && ($originalPath == $targetPath)) {
			return true;
		}

		$targetImage = imagecreatetruecolor($targetWidth, $targetHeight);
		imagecopyresampled($targetImage, $originalImage, 0, 0, 0, 0, $targetWidth, $targetHeight, $width, $height);

		if ($info[2] == IMAGETYPE_GIF) {
			imagegif($targetImage, $targetPath);
		} elseif ($info[2] == IMAGETYPE_JPEG) {
			imagejpeg($targetImage, $targetPath);
		} elseif ($info[2] == IMAGETYPE_PNG) {
			imagepng($targetImage, $targetPath);
		}

		if (!file_exists($targetPath)) {
			return false; //"Превью не сохранилось";
		}

        return $success;
	}
}
