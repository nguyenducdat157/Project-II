<?php
use MVC\Model;
class ModelsUser extends Model{
    public function find_username($username)
    {

        $stmt = $this->db->prepare('
            SELECT * from user where username = ?
        ');
        $stmt->execute(array($username));
        
        return $stmt->fetchAll();
        
    }
    public function get_all_users(){
        $res = [];
        $result =  $this->db->query('SELECT * from user');
        
        foreach($result as $sql) {
            array_push($res, $sql);
        }
        return $res;
    }
    public function create_user($data)
    {
        if (!isset($data['address'])){
            $data['address'] = '';
        }
        if (!isset($data['email'])){
            $data['email'] = '';
        }
        if (!isset($data['phone'])){
            $data['phone'] = '';
        }
        $username = $data['username'];

        $user_query = 'SELECT id FROM user WHERE username = ?';
        $stmt = $this->db->prepare($user_query);
        $result = $stmt->execute([$username]);
        // var_dump($stmt->fetchAll());
        if (!$result || $stmt->fetchAll())
            return false;

        $stmt = $this->db->prepare('
            insert into user (`username`, `password`, `firstname`, `lastname`, `phone`, `email`, `address`) values (?,?,?,?,?,?,?)
        ');
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        return $stmt->execute(array_values($data));
        // return $stmt->fetchAll();
    }

    public function update($id, $data, $password=False){
        if ($password){
            $old_password = $data['old_password'];
            $password_query = 'SELECT password FROM user WHERE id = ?';
            $stmt = $this->db->prepare($password_query);
            $result = $stmt->execute([$id]);
            if ($result){
                $user_password = $stmt->fetch(PDO::FETCH_ASSOC)['password'];
                if (!password_verify($old_password, $user_password))
                    return false;
                else{

                    $new_password = password_hash($data['new_password'], PASSWORD_DEFAULT);
                    $update_query = 'UPDATE user SET password = ? WHERE id = ?';
                    $stmt = $this->db->prepare($update_query);
                    return $stmt->execute([$new_password, $id]);

                }
            }
            return false;
            
        }
    }
}