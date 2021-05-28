<?php
use MVC\Model;
class ModelsNotification extends Model{

     public function get_notifications_by_userId($userId) {
        $res = [];
        $result =  $this->db->query('SELECT notification.* from notification, `order`
        WHERE  notification.id_order = `order`.`id` and `order`.`userID` = '. $userId);
    
        foreach($result as $sql) {
            array_push($res, $sql);
        }
        return $res;
       

     }

     public function create_notification($data){
        $orderId= $data['orderId'];
            $content = $data['content'];
            $status = $data['status'];
            $createTime = $data['createTime'];
            $notifyInfo = array($orderId, $content, $status, $createTime);
        
        $stmt = $this->db->prepare('
        insert into `notification` (`id_order`, `content`, `status`, `createTime`) values (?,?,?,?)');
        var_dump($stmt);
        if ($stmt->execute(array_values($notifyInfo))){ 
            return true;
        }

        return false;
    }


    

   

    

}