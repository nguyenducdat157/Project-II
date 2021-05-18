<?php
use MVC\Model;
class ModelsWishlist extends Model{
    public function create_wishlist($data){
       
        $userId = $data->user_id;
        $productId = $data->product_id;
        //echo $userId . $productId;
        
        $wishlistInfo = array($userId, $productId);
        $stmt = $this->db->prepare('
        insert into `wish_list` (`user_id`, `product_id`) values (?, ?)');

       // $st2 = $db->prepare("UPDATE users SET username = :username WHERE id = :id");
        // $stmt->bindParam (":user_id", $userId);
        // $stmt->bindParam (":product_id", $productId);
        //$st2->execute();
        if($stmt->execute(array_values($wishlistInfo))) {
            return true;
            // echo 'Success';
        }
        printf("Error");
        return false;
    }

    public function getWishlistById($id) {
        $res = [];
        $result = $this->db->query('select * from wish_list WHERE wish_list.user_id = '.$id);
        // return $stmt;

        foreach($result as $sql) {
            array_push($res, $sql);
        }
        return $res;
    }

    public function deteleWishlistById($data) {
        $userId = $data->user_id;
        $productId = $data->product_id;
        //print_r($data);
        $wishlistInfo = array($userId, $productId);
        $stmt = $this->db->prepare('
        delete from `wish_list` where wish_list.user_id = ? and wish_list.product_id = ?');

       // $st2 = $db->prepare("UPDATE users SET username = :username WHERE id = :id");
        // $stmt->bindParam (":user_id", $userId);
        // $stmt->bindParam (":product_id", $productId);
        //$st2->execute();
        if($stmt->execute(array_values($wishlistInfo))) {
            return true;
            // echo 'Success';
        }
        printf("Error");
        return false;
    }

    public function getProductWishlistById($id) {
        $res = [];

        $result = $this->db->query('select product.* from product, wish_list WHERE product.ID = wish_list.product_id and wish_list.user_id = '.$id );
        // return $stmt;

        foreach($result as $sql) {
            array_push($res, $sql);
        }
        return $res;
    }
}