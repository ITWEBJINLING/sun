<?php
class router{
    static function run(){
        if(!isset($_SERVER['PATH_INFO']) || $_SERVER['PATH_INFO'] == '/'){
            $model = 'admin';
            $fn = 'login';
        }else{
            $pathinfo = explode('/', substr($_SERVER['PATH_INFO'],1));
            $model = $pathinfo[0];
            $fn = isset($pathinfo[1])?$pathinfo[1]:'index';
        }
        if(file_exists("App/{$model}.php")){
            include 'App/'.$model.'.php';
            if(class_exists($model)){
                $page = new $model();
                if(method_exists($page,$fn)){
                    $page->$fn();
                }else{
                    include "App/views/404.html";
                }
            }else {
                include "App/views/404.html";
            }
        }else{
            include "App/views/404.html";
        }
    }
}