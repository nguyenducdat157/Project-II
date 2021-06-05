<?php

use MVC\Controller;

require SYSTEM . 'JWT.php';
class ControllersProduct extends Controller {
    private $_model;
    public function __construct(){
        Controller::__construct();
        $this->_model = $this->model('product');
    }

    public function get_all_products($params=null){
        if(!$params) {
            $result = $this->_model->select_all();
        }
        else {
            $result = $this->_model->select_all($params);
        }
       
        $this->response->sendStatus(200);
        $this->response->setContent(['response'=> $result]);     
    }
    public function get_products_by_type() {
        $type = isset($_GET['type']) ? $_GET['type'] : ''; 
        $result = $this->_model->getProductsByType($type);
     //   $response = $result->rows;

        $this->response->sendStatus(200);
        $this->response->setContent(['response'=> $result]);  


    }
    public function get($params){
        $id = $params['id'];
        $product = $this->_model->get($id);
        if ($product){
            $imgFile = $product['imgFile'];
            $product['imgFile'] = img_to_base64($imgFile);
            $this->send(200, $product);
        }
        else 
            $this->send(404, ['error' => 'Product not found']);
    }
    public function create(){
        $filename = $_FILES["imgFile"]["name"];
        $tmp_name = $_FILES["imgFile"]["tmp_name"];
        $error = $_FILES["imgFile"]["error"];

        if ($error > 0)    
            $this->send(400, "Error uploading file");
        else {
            $filename = preg_replace('/\s+/', '-', $filename);
              
            $upload_name = UPLOAD .  'products/' . $filename;
            
            if (move_uploaded_file($tmp_name, $upload_name)) {

                // print_r(array_keys($data));
                $method = $_POST['method'];
                unset($_POST['method']);
                $data = $_POST; 
                $data['imgFile'] = $filename;
                if ($method == 'POST'){
                    $result = $this->_model->create($data);
                    if ($result)
                        $this->send(201, "Created new product");
                    else 
                        $this->send(400, "Error creating new product");
                }
                else{
                    $productID = $data['ID'];
                    unset($data['ID']);
                    $result = $this->_model->update($productID, $data);
                    if ($result)
                        $this->send(201, "Updated product");
                    else 
                        $this->send(400, "Error updating product");
    
                }
                


            } 
            else
                $this->send(400, "Error creating new product");
            
        }

    }


    public function update($params){
        $productID = $params['id'];
        parse_str(file_get_contents("php://input"),$data);
        // var_dump($data);
        $img = $data['imgFile'];
        var_dump(array_keys($data));
        $filename = $_FILES["imgFile"]["name"];
        $tmp_name = $_FILES["imgFile"]["tmp_name"];
        $error = $_FILES["imgFile"]["error"];

        if ($error > 0)    
            $this->send(400, "Error uploading file");
        else {
            $filename = preg_replace('/\s+/', '-', $filename);
              
            $upload_name = UPLOAD .  'products/' . $filename;
            
            if (move_uploaded_file($tmp_name, $upload_name)) {
                $data = json_decode(file_get_contents('php://input'), true);
                echo array_keys($data);
                // $data['imgFile'] = $filename;
                $result = $this->_model->update($productID, $data);
                if ($result)
                    $this->send(201, "Updated product");
                else 
                    $this->send(400, "Error updating product");

            } 
            else
                $this->send(400, "Error updating product");
            
        }
    }

    public function delete($params){
        $productID = $params['id'];
        $result = $this->_model->delete($productID);
        if ($result)
            $this->response->sendStatus(200);
        else 
            $this->response->sendStatus(400); 
    }
    public function get_products_by_key() {
        $key = isset($_GET['keyword']) ? $_GET['keyword'] : '';
        $result = $this->_model->getProductsByKey($key);
       
       // $response = $result->rows;

        $this->response->sendStatus(200);
        $this->response->setContent(['response'=> $result]);  
    }

    public function get_products_by_status() {
        $status = isset($_GET['status']) ? $_GET['status'] : die();
        if($status=='sale'){
            $result = $this->_model->getSaleProducts();
        }
        else if($status=='new') {
            $result = $this->_model->getNewProducts();
        }
        
       
       // $response = $result->rows;

        $this->response->sendStatus(200);
        $this->response->setContent(['response'=> $result]); 
    }


    

    


}