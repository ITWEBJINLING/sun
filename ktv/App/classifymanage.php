<?php
class classifymanage{
    public $db;
    function __construct()
    {
        $obj=new db();
        $this->mysql = $obj->mysql;
    }
    function index(){
        $title = "歌曲管理";
        include 'App/views/classifymanage.html';
    }
    /////////////////////////////////////////////分类/////////////////////////////////////////////////////////
    function show(){
        $data = $this->mysql->query("select * from classify")->fetch_all('1');
        echo json_encode($data);
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
        $sql = "insert into classify $str";
        $this->mysql->query($sql);
        if ($this->mysql->affected_rows) {
            echo 'ok';
            exit();
        }
        echo 'error';
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
    function delete(){
        $cid = $_GET['cid'];
        $this->mysql->query("delete from classify where cid =$cid");
        if ($this->mysql->affected_rows) {
            echo 'ok';
            exit();
        }
        echo 'error';
    }
    function update(){
        $cid = $_GET['cid'];
        $value = $_GET['value'];
        $type = $_GET['type'];
        $this->mysql->query("update classify set {$type} = '{$value}' where cid = $cid");
        if ($this->mysql->affected_rows) {
            echo 'ok';
            exit();
        }
        echo 'error';
    }
}