<?php

use MVC\Controller;
//use JWT\JWT;
//require SYSTEM . 'JWT.php';
class ControllersHome extends Controller {
    public function validate_user()
    {
        
        // $model = $this->model('login');
        // $username = $_POST['username'];
        // $user = ($model->find_username($username))[0];
        // if(password_verify($_POST['password'], $user['password']))
        // {
        //     $token = JWT::encode($user, SECRET_KEY);
        //     echo($token);
            
        // }
        // else
        // {
        //     echo("invalid password");
        // }
        echo 'Home';
        
    
    }

}