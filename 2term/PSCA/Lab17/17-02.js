const express=require('express')
const cookieParser=require('cookie-parser')
const {Sequelize,DataTypes}=require('sequelize');
const path=require('path')
const app=express();
const jwt=require('jsonwebtoken');
const fs=require('fs');
const Redis=require('ioredis');

app.use(cookieParser('cookie_key'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/static'));
app.use((req,res,next)=>{
    if(req.cookies.accessToken){
        jwt.verify(req.cookies.accessToken,'access_token',(err, payload)=>{
            if(err) next();
            else if(payload){
                req.payload=payload
                next();
            }
        })
    }
    else next();
})
//===SEQUELIZE===
const sequelize=new Sequelize('JWT_lab17','Admin','123',{
    host:'localhost',
    dialect:'mssql',
    define: { 
        timestamps: false 
    },
    pool: {
        max: 10,
        min: 1,
        idle: 10000
    }
})
sequelize.authenticate().then(()=>{
    console.log('Connection with database is successful');
}).catch(e=>{
    console.log(e.message);
})

const users=sequelize.define(
    'Users',
    {
        id:{
            type: DataTypes.INTEGER, 
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nickname:{
            type: DataTypes.STRING(20),
            allowNull:false,
            unique:true
        },
        password:{
            type: DataTypes.STRING(32),
            allowNull:false,
            unique: true
        }
    },
    {
        sequelize,
        tableName:"Users",
        timestamps: false
    }
);
newUser=async(login, password)=>{
    await users.create({nickname: login, password: password})
}


//===REDIS===
const clientRedis=new Redis({url: "redis://localhost:6379"});
clientRedis.on('connect', ()=>{
    console.log('Redis is working');
})
clientRedis.on('error',(e)=>{
    console.log(e.message);
})
clientRedis.on('end',()=>{
    console.log('Redis ended its work')
})



//===WEB-TOKEN===
generateAccessToken=(candidate)=>{
    return jwt.sign(
        {id: candidate.id, nickname: candidate.nickname},
        'access_token',
        {expiresIn: '600s'}
    );
}
generateRefreshToken=(candidate)=>{
    return jwt.sign(
        {id: candidate.id, nickname: candidate.nickname},
        'refresh_token',
        {expiresIn:'86400s'}
    );
}

app.get('/',(req,res)=>{
    res.redirect('/login')
})

app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/static/login.html');
})

app.post('/login',async (req,res)=>{
    const candidate=await users.findOne({
        where:{
            nickname: req.body.username,
            password: req.body.password
        }
    });
    if(candidate){
        const accessToken=generateAccessToken(candidate);
        const refreshToken=generateRefreshToken(candidate);
        res.cookie('accessToken',accessToken,{
            httpOnly: true,
            sameSite: 'strict'
        })
        
        res.cookie('refreshToken',refreshToken,{
            httpOnly: true,
            sameSite: 'strict',
            path:'/logout'
        })
        
        res.cookie('refreshToken',refreshToken,{
            httpOnly: true,
            sameSite: 'strict',
            path:'/refresh-token'
        })        
        res.redirect('/resource')
    }
    else{
        res.redirect('/login')
    }
})
app.get('/refresh-token', async (req,res)=>{
    if(req.cookies.refreshToken){
        let isTokenExist=await clientRedis.get(req.cookies.refreshToken);
        if(isTokenExist===null){
            jwt.verify(req.cookies.refreshToken,'refresh_token',async(err, payload)=>{
                if(err) res.send(err.message);
                else if(payload){
                    const candidate=await users.findOne({
                        where:{
                            id: payload.id
                        }
                    });
                    const accessToken=generateAccessToken(candidate);
                    const refreshToken=generateRefreshToken(candidate);
                    res.cookie('accessToken',accessToken,{
                        httpOnly: true,
                        sameSite: strict
                    })
                    res.cookie('refreshToken',refreshToken,{
                        httpOnly: true,
                        sameSite: strict,
                        path:'/logout'
                    })
                    res.cookie('refreshToken',refreshToken,{
                        httpOnly: true,
                        sameSite: strict,
                        path:'/refresh-token'
                    })
                    res.redirect('/resource')
                }
                res.status(401).send('<h2>ERROR 401:Invalid Token</h2>');
            })
        }
        else{
            return res.status(401).send('<h2>ERROR 401:Unathorized Access</h2>')
        }
    }
})
app.get('/logout', async(req,res)=>{
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    await clientRedis.set(req.cookies.refreshToken,'blocked');
    res.redirect('/login')
})
app.get('/resource',(req,res)=>{
    if(!req.payload){
        res.status(401).send('<h2>ERROR 401: Unauthorized Access</h2>')
    }
    res.status(200).send(`
        <h2>Hello, ${req.payload.nickname}</h2>
        <a href='/logout'>Log Out</a>
    `)
});
app.get('/registration', (req,res)=>{
    res.sendFile(__dirname+'/static/register.html');
})
app.post('/registration',(req,res)=>{
    newUser(req.body.username, req.body.password);
    res.redirect('/login')
})

app.listen(8082, ()=>console.log('Listening to http://localhost:8082'));


