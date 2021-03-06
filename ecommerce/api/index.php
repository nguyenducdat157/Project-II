<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
   // header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])){
       // header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  
        header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS'); 
    }
             

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}


// load config and startup file
require 'config.php';
require SYSTEM . 'Startup.php';

// using
use Router\Router;

// create object of request and response class
$request = new Http\Request();
$response = new Http\Response();

$response->setHeader('Access-Control-Allow-Origin: *');
$response->setHeader("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
$response->setHeader('Content-Type: application/json; charset=UTF-8');

// set request url and method
// echo $request->getUrl() . "<br>";
// echo $request->getMethod() . "<br>";
// echo $request->getUrl();

$router = new Router($request->getUrl(), $request->getMethod());

// import router file
require 'Router/Router.php';

// Router Run Request
$router->run();

// Response Render Content
$response->render();