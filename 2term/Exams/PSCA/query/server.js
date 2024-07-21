const qstr=require('querystring');
const url=require('url');
const express=require('express');
const app=express();

var object=null;

app.use('/', (req,res, next)=>{
    res.cookie('cookie-cookie','nul')
    next()
}, (req,res, next)=>{
    if(req.method==='GET'){
        object={
            queryparams: JSON.stringify(req.query),
            host: req.headers['host']
        }
        res.send(JSON.stringify(object, null, 4))
    }else if(req.method==='POST'){
        object={
            queryparams: JSON.stringify(req.query),
            cookie: req.headers['cookie']
        }
        res.send(JSON.stringify(object, null, 4))
    }
})

app.listen(3000);


// Сервер express, get запрос вывести query параметры и значение заголовка host, 
// post запрос вывести параметры(json,html,xml) и значение cookies, middleware для регистрации входящих запросов

