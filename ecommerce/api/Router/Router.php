<?php



$router->get('/', function(){
    echo "Welcome";
});

$router->get('/products', 'product@get_all_products');
$router->get('/products/:id', 'product@get');
$router->post('/products', 'product@create');
$router->put('/products/:id', 'product@update');
$router->delete('/products/:id', 'product@delete');
$router->get('/users', 'user@get_all_users');
$router->post('/login','user@validate_user');
$router->post('/register','user@register');
$router->post('/orders', 'order@create_order');
$router->get('/products/:type', 'product@get_products_by_type');