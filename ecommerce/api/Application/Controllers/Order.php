<?php

use MVC\Controller;

require SYSTEM . 'JWT.php';
class ControllersOrder extends Controller {
    private $_model;
    public function __construct(){
        Controller::__construct();
        $this->_model = $this->model('order');
    }

    public function create_order(){
        header('Content-type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);
        $timeCreated = $data['time_created'];
        $userId = $data['user_id'];
        $shipInfo = $data['ship_info'];
        extract($shipInfo);
        $orderInfo = array($userId, $firstname . ' ' . $lastname, $timeCreated, 'pending', $shipFee, $address, $phone);
        $result = $this->_model->create_order($data);
        if ($result){
            $response = 'Successfully created order';
            $this->response->sendStatus(200);
            $this->response->setContent(['response' => $response]);
        }
        else{
            $response = 'Error creating order';
            $this->response->sendStatus(401);
            $this->response->setContent(['response' => $response]);
        }
    }
    public function get_all_orders() {
        $userId = isset($_GET['userId']) ? $_GET['userId'] : 'admin'; 

        $result = '';
        if($userId=='admin') {
            $result = $this->_model->get_all_orders();
        }
        else {
            $result = $this->_model->get_orders_by_userId($userId);
        }
      //  $response = $result->rows;

        $this->response->sendStatus(200);
        $this->response->setContent(['response'=> $result]);   
    }
    public function get_product_in_order() {
        $orderId = isset($_GET['orderId']) ? $_GET['orderId'] : die();
        $result = $this->_model->get_product_by_orderId($orderId);
        
       
      //  $response = $result->rows;

        $this->response->sendStatus(200);
        $this->response->setContent(['response'=> $result]); 
    }

    


}