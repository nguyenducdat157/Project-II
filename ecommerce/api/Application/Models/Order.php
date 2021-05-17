<?php
use MVC\Model;
class ModelsOrder extends Model{
    public function create_order($data){
        $timeCreated = $data['time_created'];
        $userId = $data['user_id'];
        $shipInfo = $data['ship_info'];
        extract($shipInfo);
        $orderInfo = array($userId, $firstname . ' ' . $lastname, $timeCreated, 'pending', $shipFee, $address, $phone);
        $products = $data['products'];
        
        $stmt = $this->db->prepare('
        insert into `order` (`userID`, `name`, `createTime`, `status`, `shippingFee`, `address`, `phone`) values (?,?,?,?,?,?,?)');
        if ($stmt->execute(array_values($orderInfo))){
            $orderID =  $this->db->getLastId();
            foreach($products as $product){
                $productID = $product['id'];
                $amount = $product['amount'];
                $size = $product['size'];
                $orderItem = array($productID, $amount, $orderID);
                $stmt = $this->db->prepare('
                insert into order_item (`product_id`, `amount`, `order_id`) values (?, ?, ?)');
                if (!$stmt->execute(array_values($orderItem))){
                    return false;
                }
                
            }
            return true;
        }

        return false;
    }

    public function get_all_orders() {
        return $this->db->query('SELECT `order`.*, sum(product.price * (1 - product.saleOff / 100) * order_item.amount) as total_price
                from order_item, product, `order`     
                WHERE order_item.order_id = `order`.id
                and order_item.product_id = product.ID
                GROUP BY `order`.`userID`, `order`.`id`');
    }

    public function get_orders_by_userId($userId) {
        return $this->db->query('SELECT `order`.*, sum(product.price * (1 - product.saleOff / 100) * order_item.amount) as total_price
                from order_item, product, `order`     
                WHERE order_item.order_id = `order`.id
                and order_item.product_id = product.ID
                 and `order`.userID = '.$userId. ' GROUP BY `order`.`userID`, `order`.`id`');
        
        // $orders = [];
        // $stmt = $this->db->prepare('select * from order where userID = '. $userId);
        // // while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            
        // //     $orderId = $row['id'];
        // //     $query = 'select sum(product.price * order_item.amount) as total_price from order_item, product where order_item.product_id = product.ID and order_item.order_id = '. $orderID;
        // //     $result = $this->db->query($query);
        // //     $total = $result->fetch();
        // //     $row['total'] = $total;
        // //     array_push($orders, $row);
        // // }
        // $result = $stmt->rows;
        // // foreach($result as $row) {
        // //     $orderId = $row['id'];
        // //     $query = 'select sum(product.price * order_item.amount) as total_price from order_item, product where order_item.product_id = product.ID and order_item.order_id = '. $orderID;
        // //     $result = $this->db->query($query);
        // //     $total = $result->row;
        // //     $row['total'] = $total;
        // //     array_push($orders, $row);
        // // }
        // return $result;
        //return $orders;

    }

    public function get_product_by_orderId($orderId) {
        return $this->db->query('
        select product.*, order_item.amount as amount from product, order_item 
        WHERE order_item.product_id = product.ID 
        and order_item.order_id = '.$orderId. ' GROUP by product.ID');
    }
}