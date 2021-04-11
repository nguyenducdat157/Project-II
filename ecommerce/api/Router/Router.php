<?php



$router->get('/', function(){
    echo "Welcome";
});

$router->get('/products', 'product@get_all_products');
$router->get('/users', 'user@get_all_users');
$router->post('/login','user@validate_user');
$router->post('/register','user@register');