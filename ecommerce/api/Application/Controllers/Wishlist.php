<?php

use MVC\Controller;
use JWT\JWT;
require SYSTEM . 'JWT.php';
class ControllersWishlist extends Controller {
    private $_model;
    public function __construct(){
        Controller::__construct();
        $this->_model = $this->model('wishlist');
    }

    public function add_to_wishlist(){
        header('Content-type: application/json');
        $data = json_decode(file_get_contents('php://input'));
        $userId = $data->user_id;
        $productId = $data->product_id;
      
        $result = $this->_model->create_wishlist($data);
        if ($result){
            $response = 'Successfully created wishlist';
            $this->response->sendStatus(201);
            $this->response->setContent(['response' => $response]);
        }
        else{
            $response = 'Error creating wishlist';
            $this->response->sendStatus(401);
            $this->response->setContent(['response' => $response]);
        }
    }

    public function delete_by_id(){
        header('Content-type: application/json');
        
        $data = json_decode(file_get_contents('php://input'));
        // $userId = $data->user_id;
        // $productId = $data->product_id;
        $result = $this->_model->deteleWishlistById($data);
        if ($result){
            $response = 'Delete wishlist successful';
            $this->response->sendStatus(201);
            $this->response->setContent(['response' => $response]);
        }
        else{
            $response = 'Delete Error';
            $this->response->sendStatus(401);
            $this->response->setContent(['response' => $response]);
        }
    }

    public function get_wishlist_by_id() {
        $id = isset($_GET['id']) ? $_GET['id'] : ''; 
        $result = $this->_model->getWishlistById($id);
      //  $response = $result->rows;

        $this->response->sendStatus(200);
        $this->response->setContent(['response'=> $result]);  


    }

    public function get_product_wishlist_by_id() {
        $id = isset($_GET['id']) ? $_GET['id'] : ''; 
        $result = $this->_model->getProductWishlistById($id);
       // $response = $result->rows;

        $this->response->sendStatus(200);
        $this->response->setContent(['response'=> $result]);  


    }

    


}