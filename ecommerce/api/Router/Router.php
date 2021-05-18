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
$router->get('/products/search/', 'product@get_products_by_key');
$router->get('/products/status', 'product@get_products_by_status');

$router->post('/wishlists', 'wishlist@add_to_wishlist');
$router->get('/wishlists', 'wishlist@get_wishlist_by_id');
$router->delete('/wishlists', 'wishlist@delete_by_id');
$router->get('/wishlists/products', 'wishlist@get_product_wishlist_by_id');

// order
$router->get('/orders', 'order@get_all_orders');
$router->get('/orders/products', 'order@get_product_in_order');

//$router->post('/deletewishlists', 'wishlist@delete_by_id');