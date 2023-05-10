<?php


namespace App\Traits;


use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\File\File;

trait FilesKit
{

    static function storeFile(UploadedFile $file, string $domain = "misc", $public = false)
    {
        $file_name = time() . '.' . $file->getClientOriginalExtension();
        $path = static::getFoldericPath($domain, $public) . DIRECTORY_SEPARATOR . $file_name;
        $i = 1;
        while (file_exists($path)) {
            $file_name = time() . $i . '.' . $file->getClientOriginalExtension();
            $path = static::getFoldericPath($domain, $public) . DIRECTORY_SEPARATOR . $file_name;
            $i++;
        }
        $file->move(static::getFoldericPath($domain, $public), $file_name);
        return static::getWebicPath($domain, $file_name, $public);
    }


    static function deleteFile($file)
    {
        return @unlink(public_path($file));
    }

    static function getFoldericPath($domain, $public = false)
    {
        return public_path(join(DIRECTORY_SEPARATOR, [$public ? 'public_uploads' : 'uploads', $domain]));
    }

    static function getWebicPath($domain, $file, $public = false)
    {
        return '/' . join('/', [$public ? 'public_uploads' : 'uploads', $domain, $file]);
    }

}
