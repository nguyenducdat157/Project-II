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
       
       // $response = $result->rows;
       // print_r($response);
        // while($row = $result->fetch()){
        //     array_push($response, $row);
        // }
        // foreach($result as $row){
        //     array_push($response, $row);
        // }
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
        if ($product)
            $this->send(200, $product);
        else 
            $this->send(404, ['error' => 'Product not found']);
    }
    public function create(){
        
        $data = json_decode(file_get_contents('php://input'));
        $result = $this->_model->create($data);
        if ($result)
            $this->response->sendStatus(201);
        else 
            $this->response->sendStatus(400);
    }


    public function update($params){
        $productID = $params['id'];
        $data = json_decode(file_get_contents('php://input'));
        $result = $this->_model->update($productID, $data);
        if ($result)
            $this->response->sendStatus(200);
        else 
            $this->response->sendStatus(400);
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