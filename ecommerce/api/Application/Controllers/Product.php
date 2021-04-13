<?php

use MVC\Controller;
use JWT\JWT;
require SYSTEM . 'JWT.php';
class ControllersProduct extends Controller {
    private $_model;
    public function __construct(){
        Controller::__construct();
        $this->_model = $this->model('product');
    }

    public function get_all_products(){
        $result = $this->_model->select_all();
        $response = $result->rows;
       // print_r($response);
        // while($row = $result->fetch()){
        //     array_push($response, $row);
        // }
        // foreach($result as $row){
        //     array_push($response, $row);
        // }
        $this->response->sendStatus(200);
        $this->response->setContent(['response'=> $response]);     
    }
    public function get_products_by_type() {
        $type = isset($_GET['type']) ? $_GET['type'] : ''; 
        $result = $this->_model->getProductsByType($type);
        $response = $result->rows;

        $this->response->sendStatus(200);
        $this->response->setContent(['response'=> $response]);  


    }

    


}