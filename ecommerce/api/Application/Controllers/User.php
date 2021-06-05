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
        if (count(array($users)) > 0){
           // $response = ['user'=>$users];
            $this->response->sendStatus(200);
            $this->response->setContent(['response'=> $users]);    
        }
        else{
            $response = [];
            $this->response->sendStatus(200);
            $this->response->setContent(['response'=> $response]);     
        }

    }
    public function register()
    {
        header('Content-type: application/json');
        // $this->_model->create_user($_POST['data']);
        $data = json_decode(file_get_contents('php://input'), true);
       
        if ($this->_model->create_user($data)){
            $user = ($this->_model->find_username($data['username']));
            $user = $user[0];
            $token = JWT::encode($user, SECRET_KEY);        
            $response = ['user'=>$user];
            $this->send(201, ['token' => $token, 'response'=> $response]);
            
        }
        else{
            $response = 'Error creating user';
            $this->send(400, ['response'=>$response]);
        }

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

    public function update($params){
        $id = $params['id'];
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['old_password'])){
            $result = $this->_model->update($id, $data, true);
            if ($result)
                $this->send(200, "Successfully updated password");
            else 
                $this->send(400, "Error updating password");
        }
        // else{
        //     $result = $this->_model->update($id, $data);
        // }
    }

}