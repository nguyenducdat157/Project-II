<?php
use MVC\Model;
class ModelsProduct extends Model{


    private $id;
    private $availableAmount;
    private $description;
    private $brand;
    private $imgFile;
    private $importDate;
    private $price;
    private $name;
    private $saleOff;
    private $rating;
    private $soldAmount;
    private $status;
    private $type;

    // Ham set
    public function setId($id) {
        $this->id = $id;
    }
    public function setAvailableAmount($availableAmount) {
        $this->availableAmount = $availableAmount;
    }
    public function setDescription($description) {
        $this->description = $description;
    }
    public function setBrand($brand) {
        $this->brand = $brand;
    }
    public function setImgFile($imgFile) {
        $this->imgFile = $imgFile;
    }
    public function setImportDate($importDate) {
        $this->importDate = $importDate;
    }
    public function setPrice($price) {
        $this->price = $price;
    }
    public function setName($id) {
        $this->id = $id;
    }
    public function setSaleOff($id) {
        $this->id = $id;
    }
    public function setRating($id) {
        $this->id = $id;
    }
    public function setSoldAmount($soldAmount) {
        $this->soldAmount = $soldAmount;
    }
    public function setStatus($status) {
        $this->status = $status;
    }
    public function setType($type) {
        $this->type = $type;
    }

    // Ham get
    public function getId() {
       return  $this->id;   }
    public function getAvailableAmount() {
        return $this->availableAmount;
    }
    public function getDescription() {
        return $this->description;
    }
    public function getBrand() {
        return $this->brand;
    }
    public function getImgFile() {
        return $this->imgFile;
    }
    public function getImportDate() {
        return $this->importDate;
    }
    public function getPrice() {
        return $this->price;
    }
    public function getName() {
       return  $this->name;   }
    public function getSaleOff() {
        return  $this->saleOff;
    }
    public function getRating() {
       return  $this->rating ;
    }
    public function getSoldAmount() {
        return $this->soldAmount;
    }
    public function getStatus() {
        return $this->status;
    }
    public function getType() {
        return $this->type;
    }
    
    public function select_all(){
        return $this->db->query('SELECT * from product');
    }

    public function getProductsByType($type) {
       
        $stmt = $this->db->query('select * from product where type like "%'. $type. '%"');
        return $stmt;
    }

    public function getProductsByKey($key) {
        $stmt = $this->db->query('select * from product where brand like "%'. $key. '%" or name like "%'. $key. '%"
        or type like "%'. $key. '%"');
        return $stmt;
    }

    public function getSaleProducts() {
        $stmt = $this->db->query('select * from product where saleOff = 50');
        return $stmt;
    }

    public function getNewProducts() {
        $stmt = $this->db->query('SELECT * from product WHERE datediff(CURDATE(), product.importDate) < 30
        ');
        return $stmt;
    }



}