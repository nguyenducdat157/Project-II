<?php

use MVC\Controller;
use JWT\JWT;
require SYSTEM . 'JWT.php';
class ControllersUser extends Controller {
    private $_model;
    public function __construct(){
        Controller::__construct();
        $this->_model = $this->model('user');
    }
    public function get_all_users(){
        $users = $this->_model->get_all_users();
        if (count($users) > 0){
            $response = ['user'=>$users];
            $this->response->sendStatus(200);
            $this->response->setContent(['response'=> $response]);    
        }
        else{
            $response = ['user'=>array()];
            $this->response->sendStatus(200);
            $this->response->setContent(['response'=> $response]);     
        }

    }
    public function register()
    {
       
        $this->_model->create_user($_POST);

    }
    public function validate_user()
    {
        
        header('Content-type: application/json');
        
        $data = json_decode(file_get_contents('php://input'), true);
       
        $username = $data['username'];
        $password = $data['password'];
        $user = ($this->_model->find_username($username));
        
        $response ='';
        if(sizeof($user) == 0)
        {
            $response = 'invalid_username';
            $this->response->sendStatus(401);

            $this->response->setContent(['response'=> $response]);

        }
        else{
            $user = $user[0];
            
       
            if(password_verify($password, $user['password']))
            {
                $token = JWT::encode($user, SECRET_KEY);
                
                $response = ['user'=>$user];
                $this->response->sendStatus(200);
                $this->response->setContent(['token' => $token, 'response'=> $response]);    
            }
            else
            {
                $response = 'invalid_password';
                $this->response->sendStatus(401);
                $this->response->setContent([ 'response'=> $response]);
            }
        }
        
        
    
    }

}