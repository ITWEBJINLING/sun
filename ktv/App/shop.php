<?php
    class shop{
        public $db;
        function __construct()
        {
            $obj=new db();
            $this->mysql = $obj->mysql;
        }
        function index(){
            include 'App/views/shop.html';
        }
        function select(){
           $result = $this->mysql->query("select * from shop");
            $data= [];
           while($row = $result->fetch_assoc()){
               array_push($data,$row);
           }
            echo json_encode($data);
        }
        function order(){
            include 'App/views/shoplist.html';
        }
        function sure(){
            include 'App/views/order.html';
        }
        function sureList(){
            $this->mysql->autocommit(false);
            $this->mysql->query("insert into orderlist (oname) VALUES ('王方方')");
            $oid = $this->mysql->insert_id;

            $obj = $_REQUEST['obj'];
            $data = json_decode($obj);

             for($i=0;$i<count($data);$i++){
                $sql = "insert into orderextra (sid,name,num,price,oid) values ('{$data[$i]->sid}',
'{$data[$i]->name}','{$data[$i]->num}','{$data[$i]->price}',$oid)";
                $this->mysql->query($sql);
            }
           if($this->mysql->affected_rows){
                 $this->mysql->commit();
                 echo 'ok';
                 exit();
            }else{
               $this->mysql->rollback();
               echo 'error';
           }

        }

    }