const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    if(Object.keys(req.query).length === 0){
        res.send('I am Rookie');
    }
    else{
        res.redirect('/index');
    }
})

app.get('/index',(req,res)=>{
    res.send('I am Smesharik now!');
})

app.listen(3000);

// на express создать сервер
// и при запросе по определённой ссылке query или path ( не помню точно) сделать редирект на другую ссылку