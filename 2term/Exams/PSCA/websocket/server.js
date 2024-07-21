const http=require('http');
const url=require('url');
const fs=require('fs');
const WebSocket=require('ws');


http.createServer((req,res)=>{
    if (req.method === 'GET' && url.parse(req.url).pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(fs.readFileSync('./index.html'));
    }
    else {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>[ERROR] Visit localhost:3000/index using GET method. </h1>');
    }
}).listen(3000, ()=>console.log("Listen to port 3000"));

var clients=[];

//broadcasting
new WebSocket.Server({port: 5403, host: 'localhost', path: '/ws'},{transport: ['websocket']})
.on('connection',ws=>{
    clients.push(ws);
    console.log('new client connected')
    ws.on('message',message=>{
        clients.forEach(client=>{
            if(client!==ws){
                client.send('Client'+clients.findIndex(el=>el===ws)+': '+message.toString());
            }
        })
    });
    ws.on('close',()=>{
        console.log('Closed');
    })
}).on('error',err=>{
    console.log('error: '+err);
})