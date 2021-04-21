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
}