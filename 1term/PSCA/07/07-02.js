let http = require('http');
let query = require('querystring');

let params = query.stringify({x: 4, y: 5});

let options = {
    host: 'localhost',
    path: "/two",
    port: 5000,
    method: 'GET'
}

setTimeout(() => {
    const req = http.request(options, res => {
        console.log(`Status code:     ${res.statusCode}`);
        console.log(`Status message:  ${res.statusMessage}`);
        console.log('params: ', params);
    });

    req.on('error', e => { console.log(`${e.message}\n\n`); })
    req.end();
}, 500);