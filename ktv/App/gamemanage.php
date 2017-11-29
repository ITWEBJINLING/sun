<?php
class gamemanage{
    function index(){
        $title = "游戏管理";
        include 'App/views/gamemanage.html';
    }
    function show(){
        $mysql = new mysqli('localhost', 'root', '', 'ktv',
            3306);
        $mysql->query('set names utf8');
        $data = $mysql->query("select * from game")->fetch_all('1');
        echo json_encode($data);
    }
     function insert(){
         $mysql = new mysqli('localhost', 'root', '', 'ktv',
             3306);
         $mysql->query('set names utf8');
         $gname = $_GET['gname'];
         $type = $_GET['type'];
         $mysql->query("insert into game (gname,type) VALUES ('{$gname}',{$type})");
         if ($mysql->affected_rows) {
             echo 'ok';
             exit();
         }
         echo 'error';
     }
     function delete(){
    $mysql = new mysqli('localhost', 'root', '', 'ktv',
        3306);
    $mysql->query('set names utf8');
    $gid = $_GET['id'];
    $mysql->query("delete from game where gid =$gid");
    if ($mysql->affected_rows) {
        echo 'ok';
        exit();
    }
    echo 'error';
}
     function update(){
         $mysql = new mysqli('localhost', 'root', '', 'ktv',
             3306);
         $mysql->query('set names utf8');
         $gid = $_GET['id'];
         $value = $_GET['value'];
         $type = $_GET['type'];
         $mysql->query("update game set {$type} = '{$value}' where gid = $gid");
         if ($mysql->affected_rows) {
             echo 'ok';
             exit();
         }
         echo 'error';
     }
}
