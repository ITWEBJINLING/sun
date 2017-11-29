<?php
class login{
    function index(){
        include 'App/views/login.html';
    }
    function check(){
        $mysql = new mysqli('localhost','root','','ktv',
            3306);
        $mysql->query('set names utf8');
        $user = $_REQUEST['user'];
        $pass = $_REQUEST['pass'];
        $sql = "select * from admin where user = '{$user}'";
        $data = $mysql->query($sql)->fetch_all(1);
        for($i=0;$i<count($data);$i++){
            if($pass == $data[$i]['pass']){
                echo 'ok';
                exit();
            }
        }
        echo 'error';
    }
}