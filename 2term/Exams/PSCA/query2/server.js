const express=require('express');
const people=require('./people.json')||[];
const fs=require('fs');
const bodyParser=require('body-parser')
const app=express();

const regex=new RegExp(/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i);

app.use(express.json());
app.use(express.static('static'))
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.sendFile('./index.html')
});

app.post('/human', (req,res, next)=>{
    console.log(req.body)
    if(!req.body.name||!req.body.age){
        res.status(418).send('Fill Age and Name')
    }
    else next()
},(req,res, next)=>{
    if(!regex.test(req.body.name)){
        res.status(418).send('Wrong format. There\'s should be [A-Za-z]')
    }
    else if(isNaN(req.body.age)||(Number(req.body.age)<0||Number(req.body.age)>100)){
        res.status(418).send('Age should be from 0 to 100')
    }
    else next()
}, async (req,res, next)=>{
    try{
        const human={
            name: req.body.name,
            age: Number(req.body.age)
        }
        people.push(human);
        await fs.promises.writeFile('people.json', JSON.stringify(people, null, 4))
        res.status(200).send('Saved to people.json');
    }
    catch(e){
        console.error(e.message);
    }
})

app.listen(3000);

// Создайте серве с помощью Express, который будет принимать POST-запрос от клиента, доставать данные об имени и возрасте и записывать в файл в формате json.
// В случае поступление другого запроса или неверных данных вохвращать соотсветсвующее сообщение ол ошибке. 
// Создайте HTTP_клиента в среде Node.js. 
// Клиент должен отправлять POST-запрос с параметрами name и age в теле(x-www-form-urlencoded).