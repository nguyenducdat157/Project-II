<?php

use MVC\Controller;
use JWT\JWT;
require SYSTEM . 'JWT.php';
class ControllersNotification extends Controller {
    private $_model;
    public function __construct(){
        Controller::__construct();
        $this->_model = $this->model('notification');
    }

    public function create_notifications(){
            header('Content-type: application/json');
            $data = json_decode(file_get_contents('php://input'), true);
            
            $result = $this->_model->create_notification($data);
            if ($result){
                $response = 'Successfully created notification';
                $this->response->sendStatus(200);
                $this->response->setContent(['response' => $response]);
            }
            else{
                $response = 'Error creating notification';
                $this->response->sendStatus(401);
                $this->response->setContent(['response' => $response]);
            }

    }

    public function get_notifications() {
        $userId = isset($_GET['userId']) ? $_GET['userId'] : die(); 

        $result = '';
        $result = $this->_model->get_notifications_by_userId($userId);

      //  $response = $result->rows;

        $this->response->sendStatus(200);
        $this->response->setContent(['response'=> $result]);   
    }
    public function set_read() {
        header('Content-type: application/json');
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];
        $result = $this->_model->set_read($id); 


        if ($result){
            $response = 'Successfully updated notification';
            $this->response->sendStatus(200);
            $this->response->setContent(['response' => $response]);
        }
        else{
            $response = 'Error updating notification';
            $this->response->sendStatus(401);
            $this->response->setContent(['response' => $response]);
        }
    }

   

    


}