const express=require('express');
const bodyParser=require('body-parser')
const fs=require('fs');

const app=express();
app.use(bodyParser.text({
    type: 'text/plain'
}))
app.use(express.static('static'));

var number=Math.floor(Math.random()*100);
console.log('I guess '+number);

app.get('/',(req,res)=>{
    res.sendFile('index.html');
});

app.post('/', (req,res,next)=>{
    if(!req.body){
        res.status(418).send('Hey, where is the number')
    }
    else{
        next();
    }
},(req,res,next)=>{
    if(isNaN(req.body)){
        res.status(419).send('Cannot parse this');
    }
    else{
        next()
    }
},(req,res)=>{
    if(Number(req.body)===number){
        res.status(200).send('CONGRATULATIONS🎉');
        number=Math.floor(Math.random()*100);
        console.log('I guess '+number);
    }
    else{
        res.status(420).send('You are wrong. Try one more!')
    }
})

app.listen(8085,()=>{
    console.log('listen to port 8085');
})

// Сервер генерирует рандомное число, клиент отправляется число на сервер в теле запроса text/plain, если числа совпадают, 
// то клиенту нужно вывести сообщение с поздравлениями, если нет, то сгенерировать ошибку с пояснением, все ошибки обрабатывать с помощью промежуточного по