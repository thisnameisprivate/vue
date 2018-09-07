// 递归替换目录下文件中的字符串

<?php

function modifyFile ($filename) {
    $fileHandler = fopen($filename, 'r+');
    $modify = '';
    while (!feof($fileHandler)) {
        $source = fgets($fileHandler);
        $modify .= str_replace("Sources", "source", $source);
    }
    if (!@unlink($filename)) {
        echo "删除文件" . $filename . "成功<br>";
    }
    $newFileHandler = fopen($filename, 'w');
    if (!feof($newFileHandler)) {
        fwrite($newFileHandler, $modify);
    }
    if (file_exists($filename)) {
        echo "更新文件" . $filename . "成功<br>";
    }
}


function sourceDir($dir) {
    $files = array();
    if ($dir != ".idea") {
        if(@$handle = opendir($dir)) {
            while(($file = readdir($handle)) !== false) {
                if($file != ".." && $file != "." && $file != "strReplace.php") {
                    if(is_dir($dir."/".$file)) {
                        $files[$file] = sourceDir($dir."/".$file);
                    } else {
                        modifyFile($dir . "/" .$file);
                    }

                }
            }
        }
    }
}
sourceDir(".");
