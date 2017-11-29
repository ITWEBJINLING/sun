<?php
class singer{
    public $db;
    function __construct()
    {
        $obj=new db();
        $this->mysql = $obj->mysql;
    }
    function index(){
        include 'App/views/singer.html';
    }
    function show(){
        $data = $this->mysql->query("select * from classify")->fetch_all(1);
        echo json_encode($data);
    }




    function singerlist(){
        include 'App/views/singerlist.html';
    }
    function select(){
        $cid= $_REQUEST['cid'];
        $data = $this->mysql->query("select classify.cname,singer.* from classify,singer where singer.cid = classify.cid and classify.cid=$cid")->fetch_all(1);
        echo json_encode($data);
    }





    function song(){
        include 'App/views/song.html';
    }
    function songlist(){
        $gid= $_REQUEST['gid'];
         $data=$this->mysql->query("select classify.cname,singer.gname,singer.gthumb from classify,singer where gid = $gid and classify.cid =  singer.cid")->fetch_assoc();
         $result = $this->mysql->query("select * from song where gid = $gid")->fetch_all(1);
         $a = [$data,$result];

        echo json_encode($a);
    }
    function collect(){
        $collect = $_GET['collect'];
        $this->mysql->query("update song set collect = '${collect}' where qid = $collect");
        var_dump("update song set collect = '${collect}' where qid = $collect");
        if($this->mysql->affected_rows){
            echo 'OK';
        }
    }
    function collectDel(){
        $collect = $_GET['collect'];
        $this->mysql->query("update song set collect = '' where qid = $collect");
        var_dump("update song set collect = '' where qid = $collect");
        if($this->mysql->affected_rows){
            echo 'OK';
        }
    }




    function play(){
        include 'App/views/play.html';
    }
    function playSelect(){
        $qid = $_GET['qid'];
        $data = $this->mysql->query("select * from song where collect != ''")->fetch_all(1);
        echo json_encode($data);
    }



    function collectShow(){
        include 'App/views/collect.html';
    }
    function collectSelect(){
        $data = $this->mysql->query("select * from song where collect != ''")->fetch_all(1);
        echo json_encode($data);
    }
}
