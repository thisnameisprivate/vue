<?php
header('Content-type:text/html; charset=utf8');
class SearchReplaceStr {
    private $search = null;
    private $matchStr = null;
    public function __construct ($search, $matchStr) {
        if ($search == null || $matchStr == null) {
            return false;
        }
        $this->search = $search;
        $this->matchStr = $matchStr;
    }
    private function modifyFile ($filename) {
        $fileHandler = fopen($filename, 'r+');
        $modify = '';
        while (!feof($fileHandler)) {
            $source = fgets($fileHandler);
            $modify .= str_replace($this->search, $this->matchStr, $source);
        }
        if (!@unlink($filename)) {
            echo "delete file " . $filename . " success<br>";
        }
        $newFileHandler = fopen($filename, 'w');
        if (!feof($newFileHandler)) {
            fwrite($newFileHandler, $modify);
        }
        if (file_exists($filename)) {
            echo "create file " . $filename . " success<br>";
        }
    }
    public function sourceDir($dir) {
        $files = array();
        if ($dir != ".idea" && $dir != 'serchReplaceStr') {
            if(@$handle = opendir($dir)) {
                while(($file = readdir($handle)) !== false) {
                    if($file != ".." && $file != "." && $file != "searchReplaceStr.php" && $file != 'index.html') {
                        if(is_dir($dir."/".$file)) {
                            $files[$file] = $this->sourceDir($dir."/".$file);
                        } else {
                            $this->modifyFile($dir . "/" . $file);
                        }
                    }
                }
            }
        }
    }
}
/*
 *
if (!is_null($_POST)) {
    $searchReplaceStr = new searchReplaceStr($_POST['target'], $_POST['strReplace']);
    print_r($searchReplaceStr->sourceDir('..'));
} else {
    echo "<script>
            alert('Please input value');
            location.href = './index.html';
          </script>";
}
 *
 * */

class Conn extends searchReplaceStr {
    private $connectionStatus = null;
    private $_user = null;
    private $_host = null;
    private $_dbname = null;
    private $_pass = null;
    private static $searchReplaceStr = null;
    private function __construct () {

    }
    public static function instance () {
        if (self::$searchReplaceStr == null) return self::$searchReplaceStr = new searchReplaceStr();
    }
    public function setConnectData ($user, $host, $dbname, $pass) {
        if ($user == null || $host == null || $dbname == null || $pass == null) return false;
        $this->_user = $user;
        $this->_host = $host;
        $this->_dbname = $dbname;
        $this->_pass = $pass;
        return true;
    }
    private function connection () {
        try {
            $this->connectionStatus = new \PDO("mysq:host=" . $this->_host . ";dbname = " . $this->_dbname, $this->_user, $this->_pass);
        } catch (PDOException $e) {
            die ("Connection fail: " . $e->getMessage());
        }
    }
}