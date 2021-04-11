<?php
use MVC\Model;
class Product extends Model{
    private $conn;
    private $id;
    private $availableAmount;
    private $description;
    private $brand;
    private $imgFile;
    private $importDate;
    private $price;
    private $name;
    private $sale;
    private $rating;
    private $soldAmount;
    private $status;
    private $type;

    
    public function read()
    {
        $stmt = $this->db->prepare('
            SELECT * from product
        ');
        $stmt->execute();
        return $stmt;
    }
}