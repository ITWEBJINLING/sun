<?php
class rank{
    public $db;
    function __construct()
    {
        $obj=new db();
        $this->mysql = $obj->mysql;
    }
    function index(){
        include 'App/views/rank.html';
    }
    function select(){
        $data = $this->mysql->query("select singer.gname,song.* from singer,song where collect != ''and singer.gid=song.gid")->fetch_all(1);
        echo json_encode($data);
    }
}