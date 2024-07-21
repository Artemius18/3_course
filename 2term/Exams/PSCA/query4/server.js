const express=require('express');
const app=express();

app.use(express.static('static'))

app.get('/', (req,res)=>{
    if(req.method!=='GET' && req.method!=='POST' && req.method!=='PUT' && req.method!=='DELETE'){
        res.status(404).send('Wrong method');
    }
    else res.sendFile('./index.html');
})

app.use('/resource',(req,res,next)=>{
    if(req.method!=='GET'&&req.method!=='POST'&&req.method!=='PUT'&&req.method!=='DELETE'){
        res.status(404).send(JSON.stringify({err:'Wrong method'}));
    }
    res.send('QUERIES:\n'+JSON.stringify(req.query,null,4)+'\n\nHEADERS:\n'+JSON.stringify(req.headers,null,4)+'\n\nBODY:\n'+JSON.stringify(req.body, null,4));
})

app.all('*',(req,res, next)=>{
    res.status(418).send('BAN')
})

app.listen(3000);