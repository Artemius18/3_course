const senderModule=require('./m06_PAF');
const http=require('http');

const sender = 'artempsenko@gmail.com';
const password = 'couy mndy auvp bvme';

http.createServer((req,resp)=>{
    resp.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
    senderModule(sender,password,'Message for task 3 lab5 PSCA');
    resp.end('<h2>Message has been succesfully sent</h2>')
}).listen(5000,()=>{console.log("Server is listening at http://localhost:5000/\n")});