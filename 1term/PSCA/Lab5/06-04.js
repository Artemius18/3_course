//C:/Users/artem/AppData/Roaming/npm/node_modules
const send = require('mypackagelab5');
const http = require('http');

const sender = 'artempsenko@gmail.com';
const password = 'couy mndy auvp bvme';

http.createServer((req,resp)=>{
    resp.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
    send(sender,password,'Message for task 3 lab5 PSCA');
    resp.end('<h2>Message has been succesfully sent</h2>')
}).listen(5001);