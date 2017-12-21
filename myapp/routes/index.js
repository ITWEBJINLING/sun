var express = require('express');
var router = express.Router();
var mysql = require('./mysql')

/* GET home page. */
router.get('/', function(req, res, next) {
    mysql.query("select *,DATE_FORMAT( FROM_DAYS( TO_DAYS( NOW( ) ) - TO_DAYS( `birthday` ) ) , '%Y' ) +0 AS age from admin",function (err,result) {
        if(err){
            res.end();
        }else{
            res.render('index', { result: result });
        }
    })
})
router.get('/add',function (req,res) {
    res.render('add')
})
router.get('/addCon',function (req,res) {
    let name = req.query.name;
    let birthday = req.query.birthday;
    let sex = req.query.sex;
    mysql.query(`insert into admin (name,birthday,sex) values ('${name}','${birthday}','${sex}')`,function (err,result) {
        if(err){
            console.log(err)
            res.end();
        }else{
            res.render('message',{message:'插入成功',url:'/add'})
        }
    })
})
router.get('/del/:id',function (req,res) {
    let id = req.params.id;
    mysql.query("delete from admin where id ="+id,function (err,result) {
        if(err){
            console.log(err);
            res.end();
        }else{
            res.render('message',{message:'删除成功',url:'/'})
        }
    })
})
router.get('/update/:id',function (req,res) {
    let id = req.params.id;
    mysql.query(`select *,DATE_FORMAT( FROM_DAYS( TO_DAYS( NOW( ) ) - TO_DAYS( birthday) ) , '%Y' ) +0 AS age from admin where id = ${id}`,function (err,result) {
        if(err){
            console.log(err);
            res.end();
        }else{
            res.render('update',{data:result})
        }
    })
})
router.get('/updateCon/:id',function (req,res) {
    let id = req.params.id;
    let name = req.query.name;
    let birthday = req.query.birthday;
    let sex = req.query.sex;
    mysql.query(`update admin set name = '${name}', birthday='${birthday}', sex='${sex}' where id=${id}`,function (err,result) {
        if(err){
            console.log(err);
            res.end();
        }else{
            res.render('message',{message:"修改成功",url:"/update/"+id})
        }
    })
})
module.exports = router;
