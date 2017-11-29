<?php
class db{
    public $mysql;
    function __construct()
    {
        $this->config();
    }
    function config(){
        $this->mysql = new mysqli('localhost','root','','ktv',
            3306);
        $this->mysql->query('set names utf8');
    }
}