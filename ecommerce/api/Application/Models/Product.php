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
    
    public function select_all($param=null){
        $query = 'SELECT * from product';

        if($param) {
        // echo $param['type'];
            $query =  $query. ' where type like "%'. $param['type']. '%"';
        // echo $query;
        }
        $res = [];
        $result =  $this->db->query($query);

        foreach($result as $sql) {
            $imgFile = $sql['imgFile'];
            $sql['imgFile'] = img_to_base64($imgFile);
            array_push($res, $sql);
        }
        return $res;
    }

    public function getProductsByType($type) {
        $res = [];
        $result = $this->db->query('select * from product where type like "%'. $type. '%"');
        
        foreach($result as $sql) {
            $imgFile = $sql['imgFile'];
            $sql['imgFile'] = img_to_base64($imgFile);
            array_push($res, $sql);
        }
        return $res;
    }

    public function getProductsByKey($key) {
        $res = [];
        $result = $this->db->query('select * from product where brand like "%'. $key. '%" or name like "%'. $key. '%"
        or type like "%'. $key. '%"');
        
        foreach($result as $sql) {
            $imgFile = $sql['imgFile'];
            $sql['imgFile'] = img_to_base64($imgFile);
            array_push($res, $sql);
        }
        return $res;
    }

    public function getSaleProducts() {
        $res = [];
        $result = $this->db->query('select * from product where saleOff = 50');
        // return $stmt;

        foreach($result as $sql) {
            $imgFile = $sql['imgFile'];
            $sql['imgFile'] = img_to_base64($imgFile);
            array_push($res, $sql);
        }
        return $res;
    }

    public function getNewProducts() {
        $res = [];
        
        $result = $this->db->query('SELECT * from product WHERE datediff(CURDATE(), product.importDate) < 30
        ');
        // return $stmt;

        foreach($result as $sql) {
            $imgFile = $sql['imgFile'];
            $sql['imgFile'] = img_to_base64($imgFile);
            array_push($res, $sql);
        }
        return $res;
    }
    public function get($id){
       
        $query = 'SELECT * FROM product WHERE id = ?';
        $stmt = $this->db->prepare($query);
        if ($stmt->execute([$id]))
            return $stmt->fetch(PDO::FETCH_ASSOC);
        return false;
    }
    public function create($data){

        $query = 'INSERT INTO product (';
        $fields = '';
        
        $values = array();
        foreach($data as $key=>$value){
            $fields .= $key . ',';
            array_push($values, $value);
        }
        $fields = substr($fields, 0, -1) . ') VALUES (';
        for ($i = 0; $i < count($values); $i++){
            $fields .= '?,';
        }
        $fields = substr($fields, 0, -1) . ')';
        $query .= $fields; 
    
        $stmt = $this->db->prepare($query);
        return $stmt->execute(array_values($values));
   
            
        
        
        // return $query;

    

    }

    public function update($id, $data){

        $update = '';
        $condition = ' WHERE id = ?';
        $values = array();
        foreach($data as $key=>$value){
            $update .= '`'.$key.'` = ?,';
            array_push($values, $value); 
        }
        array_push($values, $id);
        $update = substr($update, 0, -1);
        $query = 'UPDATE product SET ' . $update . $condition; 
        $stmt = $this->db->prepare($query);
        return $stmt->execute(array_values($values));


    }

    public function delete($id){
        $select_query = 'SELECT * FROM order_item WHERE product_id = ?';
        $stmt = $this->db->prepare($select_query);
        $result = $stmt->execute([$id]);
        if (!$result && $stmt->fetch())
            return false;
        $query = 'DELETE FROM product WHERE id = ?';
        $stmt = $this->db->prepare($query);
        return $stmt->execute([$id]);
        // try{
        //     $stmt = $this->db->prepare($query);
        //     return $stmt->execute($id);
        // } catch (PDOException){
        //     return false;
        // }
    }
}