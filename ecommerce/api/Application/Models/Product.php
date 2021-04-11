<?php
use MVC\Model;
class ModelsProduct extends Model{
    public function select_all(){
        return $this->db->query('SELECT * from product');
    }
}