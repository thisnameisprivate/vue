<?php


class Connect {
    private $user = '';
    private $pass = '';
    private $host = '';
    private $dbname = '';
    private static $instance = null;
    private function __construct() {
        // NOT INSTANCE.
    }
    public static function instance () {
        if (self::$instance == null) return self::$instance = new Connect;
    }
    public function conn ($user, $pass, $host, $dbname) {
        if ($user == null) {
            return false;
        } else if ($pass == null) {
            return false;
        } else if ($host == null) {
            return false;
        } else if ($dbname == null) {
            return false;
        }
        $this->user = $user;
        $this->pass = $pass;
        $this->host = $host;
        $this->dbname = $dbname;
        $pdo = new \PDO('mysql:host=' . $host . ';dbname=' . $dbname, $user, $pass) or die ("Connection failed~");
        $pdo->query("charset names 'utf8'");
        $sql = "select * from username where id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue('1', 'zhy');
        $stmt->execute();
        // return 2 array.
        $result = $stmt->fetchAll();
    }
}