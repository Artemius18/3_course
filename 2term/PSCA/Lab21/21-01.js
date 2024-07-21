import express from 'express'
import fs  from 'fs'
import {createClient}  from 'webdav';

const client = createClient("https://webdav.yandex.ru",{ username: "mayonezichHOTS", password: 'fmoffetsowrecgfs' });
const app = express();

const PORT = 3000;

app.post('/md/:ttttt',async(req,res)=>{
    var dir = req.params.ttttt;
    if(await client.exists(`/${dir}`))
        res.status(408).send('Dir already exist!')
    else
    {
        await client.createDirectory(`/${dir}`)
        res.send('Dir successfully create!')
    }
})

app.post('/rd/:ttttt',async(req,res)=>{
    var dir = req.params.ttttt
    if(!await client.exists(`/${dir}`))
        res.status(404).send('Invalid direcctory!')
    else
    {
        await client.deleteFile(`/${dir}`)
        res.send('Dir successfully deleted!')
    }
})

app.post('/up/:tttt',async(req,res)=>{
    var dir = req.params.tttt
    if(fs.existsSync(`./${dir}`))
    {
        const file = fs.createReadStream(`./${dir}`)
        file.pipe(await client.createWriteStream(`/${dir}`));
        res.send(`File successfully uploaded!`)
    }
    else
        res.status(404).send('Invalid file!')
})

app.post('/down/:tttt',async(req,res)=>{
    var dir = req.params.tttt
    if(await client.exists(`/${dir}`)){
        await client.createReadStream(`/${dir}`).pipe(fs.createWriteStream(`${dir}`));
        res.send(`File successfully downloaded!`)
    }
    else
    {
        res.status(404).send('Invalid file!')
    }
})

app.post('/del/:tttt',async(req,res)=>{
    var file = req.params.tttt
    if(await client.exists(`/${file}`)){
        await client.deleteFile(`/${file}`)
        res.send(`File successfully deleted!`)
    }
    else
    {
        res.status(404).send(`Invalid file!`)
    }
})

app.post('/copy/:tttt/:pppp',async(req,res)=>{
    var file = req.params.tttt
    var dir = req.params.pppp
    if(await client.exists(`/${file}`) ){
        client.copyFile(file,dir).catch(err => {
            res.status(408).send('Cant copy file')
        })
        res.send('File successfully copied!')
    }else{
        res.status(404).send('Invalid params!')
    }
})


app.post('/move/:tttt/:pppp',async(req,res)=>{
    var file = req.params.tttt
    var dir = req.params.pppp
    if(await client.exists(`/${file}`)){
        client.moveFile(file,dir).catch(err => {
            res.status(408).send('Cant move file!')
        })
        res.send('File successfully moved!')
    }else{
        res.status(404).send('Invalid params!')
    }
})


app.listen(PORT,()=>{console.log(`http://localhost:${PORT}`)})
