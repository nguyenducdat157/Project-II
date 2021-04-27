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
        return $this->db->query('SELECT * from user');
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
        $stmt = $this->db->prepare('
            insert into user (`username`, `password`, `firstname`, `lastname`, `phone`, `email`, `address`) values (?,?,?,?,?,?,?)
        ');
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        return $stmt->execute(array_values($data));
        // return $stmt->fetchAll();
    }
}