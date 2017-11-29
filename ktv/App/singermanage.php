<?php
class singermanage{
    public $db;
    function __construct()
    {
        $obj=new db();
        $this->mysql = $obj->mysql;
    }
    function index(){
        $title = "歌曲管理";
        include 'App/views/singermanage.html';
    }
///////////////////////////////////////////歌手///////////////////////////////////////////////
    function cateTree(){
        $sql = "select * from classify";
        $data = $this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function show(){
        $data = $this->mysql->query("select * from singer")->fetch_all('1');
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
        $sql = "insert into singer $str";
        $this->mysql->query($sql);
        if ($this->mysql->affected_rows) {
            echo 'ok';
            exit();
        }
        echo 'error';
    }
    function delete(){
        $gid = $_GET['gid'];
        $this->mysql->query("delete from singer where gid =$gid");
        if ($this->mysql->affected_rows) {
            echo 'ok';
            exit();
        }
        echo 'error';
    }
    function update(){
        $gid = $_GET['gid'];
        $value = $_GET['value'];
        $type = $_GET['type'];
        $this->mysql->query("update singer set {$type} = '{$value}' where gid = $gid");
        if ($this->mysql->affected_rows) {
            echo 'ok';
            exit();
        }
        echo 'error';
    }
}