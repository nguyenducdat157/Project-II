<?php


namespace Database;

use PDO;
use PDOException;

class DatabaseAdapter {
    
    /**
     *  Database Connection
     *
     * @var
     */
    protected $dbConnection;

    /**
     * Database constructor. set connection driver [pdo, mysqli, mysql,...]
     *
     * @param $driver
     * @param $hostname
     * @param $username
     * @param $password
     * @param $database
     */
    public function __construct($driver, $hostname, $username, $password, $database, $port) {
        try {
            $this->dbConnection = new PDO('mysql:host='.$hostname.'; dbname='.$database, $username, $password);
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . " <br/>";
            die();
        }
       // $this->dbConnection = new PDO($hostname, $username, $password, $database, $port);
    }


    /**
     * @param $sql
     * @return mixed
     */
    public function query($sql, $fetchMode=PDO::FETCH_ASSOC) {
        return $this->dbConnection->query($sql, $fetchMode);
    }
    public function prepare($sql)
    {
        return $this->dbConnection->prepare($sql);
    }

    /**
     * @param $value
     * @return mixed
     */
    public function escape($value) {
        $search = array("\\", "\0", "\n", "\r", "\x1a", "'", '"');
        $replace = array("\\\\", "\\0", "\\n", "\\r", "\Z", "\'", '\"');
        return str_replace($search, $replace, $value);
        // return $this->dbConnection->escape($value);
    }

    /**
     * @return mixed
     */
    public function getLastId() {
        return $this->dbConnection->lastInsertId();
    }
}
