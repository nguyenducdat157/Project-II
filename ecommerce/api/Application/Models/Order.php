<?php
use MVC\Model;
class ModelsOrder extends Model{
    public function create_order($data){
        $timeCreated = $data['time_created'];
        $userId = $data['user_id'];
        $shipInfo = $data['ship_info'];
        extract($shipInfo);
        $orderInfo = array($userId, $firstname . ' ' . $lastname, $timeCreated, 'Đang xác nhận', $shipFee, $address, $phone);
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
        $res = [];
        $result = $this->db->query('SELECT `order`.*, sum(product.price * (1 - product.saleOff / 100) * order_item.amount) as total_price
                from order_item, product, `order`     
                WHERE order_item.order_id = `order`.id
                and order_item.product_id = product.ID
                GROUP BY `order`.`userID`, `order`.`id`');
        
        foreach($result as $sql) {
            array_push($res, $sql);
        }
        return $res;
        
    }

    public function get_orders_by_userId($userId) {
        $res = [];
        $result =  $this->db->query('SELECT `order`.*, sum(product.price * (1 - product.saleOff / 100) * order_item.amount) as total_price
                from order_item, product, `order`     
                WHERE order_item.order_id = `order`.id
                and order_item.product_id = product.ID
                 and `order`.userID = '.$userId. ' GROUP BY `order`.`userID`, `order`.`id`');
        

                 
        foreach($result as $sql) {
            array_push($res, $sql);
        }
        return $res;
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


    public function get_order_by_orderId($orderId) {
        $res = [];
        $result =  $this->db->query('SELECT `order`.*, sum(product.price * (1 - product.saleOff / 100) * order_item.amount) as total_price
                from order_item, product, `order`     
                WHERE order_item.order_id = `order`.id
                and order_item.product_id = product.ID
                 and `order`.id = '.$orderId. ' GROUP BY `order`.`userID`, `order`.`id`');
        

                 
        foreach($result as $sql) {
            array_push($res, $sql);
        }
        return $res;
    }

    public function get_product_by_orderId($orderId) {
        $res = [];
        $result =  $this->db->query('
        select product.*, order_item.amount as amount from product, order_item 
        WHERE order_item.product_id = product.ID 
        and order_item.order_id = '.$orderId. ' GROUP by product.ID');

        foreach($result as $sql) {
            array_push($res, $sql);
        }
        return $res;
    }

    public function change_status_order($id, $status) {
        $sql = 'update `order` set `order`.status = "'.$status. '" where `order`.id = '. $id;
        $stmt = $this->db->prepare($sql);
        //var_dump($stmt);
        if($stmt->execute()) {
            return true;
        } 
        return false;
    }

    public function update_amount_product($orderId) {
        $sql = 'SELECT product.ID, product.availableAmount, product.soldAmount, order_item.amount 
        from product, order_item 
        WHERE product.id = `order_item`.`product_id` 
        and order_item.order_id = '. $orderId;
        $stmt = $this->db->prepare($sql);
        //var_dump($stmt);
        if($stmt->execute()) {
            $products = $stmt->fetchAll();
            //var_dump($products);
            foreach($products as $product) {
                $id = $product['ID'];
                $amount = $product['amount'];
                $availableAmount = $product['availableAmount'] + $amount;
                $soldAmount = ($product['soldAmount'] - $amount) > 0 ? $product['soldAmount'] - $amount : 0;
                $stmt = $this->db->prepare('
                    update product set product.availableAmount = '.$availableAmount.', product.soldAmount = '.$soldAmount.'
                     where product.ID = '. $id
            );
                if(!$stmt->execute()) {
                    return false;
                }

            }
            return true;
        } 
        return false;
    }


}