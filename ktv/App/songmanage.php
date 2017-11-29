<?php
class songmanage{
    public $db;
    function __construct()
    {
        $obj=new db();
        $this->mysql = $obj->mysql;
    }
    function index(){
        $title = "歌曲管理";
        include 'App/views/songmanage.html';
    }
/// ////////////////////////////////////////歌曲/////////////////////////////////////////////////////////
    function cateTree(){
        $sql = "select * from singer";
        $data = $this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function show(){
        $data = $this->mysql->query("select * from song")->fetch_all('1');
        echo json_encode($data);
    }
    function upload(){
        if(is_uploaded_file($_FILES['file']['tmp_name'])){
            if(!file_exists('Public/upload')){
                mkdir('Public/upload');
            }
        }
        if(!file_exists('Public/upload/'.date('y-m-d'))){
            mkdir('Public/upload/'.date('y-m-d'));
        }
        $path = 'Public/upload/'.date('y-m-d').'/'.$_FILES['file']['name'];

        if(move_uploaded_file($_FILES['file']['tmp_name'],$path)){
            echo '/ktv/'.$path;
        }
    }
    function insert(){
        $data = $_REQUEST;
        $keys = array_keys($data);
        $str = '(';
        for($i = 0; $i<count($keys);$i++){
            $str .= $keys[$i].',';
        }
        $str = substr($str,0,-1);
        $str.= ') values (';
        foreach($data as $v){
            $str.= "'{$v}',";
        }
        $str = substr($str,0,-1);
        $str.= ')';
        $sql = "insert into song $str";
        $this->mysql->query($sql);
        if ($this->mysql->affected_rows) {
            echo 'ok';
            exit();
        }
        echo 'error';
    }
    function delete(){
        $qid = $_GET['qid'];
        $this->mysql->query("delete from song where qid =$qid");
        if ($this->mysql->affected_rows) {
            echo 'ok';
            exit();
        }
        echo 'error';
    }
    function update(){
        $qid = $_GET['qid'];
        $value = $_GET['value'];
        $type = $_GET['type'];
        $this->mysql->query("update song set {$type} = '{$value}' where qid = $qid");
        if ($this->mysql->affected_rows) {
            echo 'ok';
            exit();
        }
        echo 'error';
    }
}