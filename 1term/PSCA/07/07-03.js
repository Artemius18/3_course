let http = require('http');
let postData = JSON.stringify({x: 4, y: 5, s: 12});

let options = {
    host: 'localhost',
    path: "/three",
    port: 5000,
    method: 'POST', 
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
}

const req = http.request(options, (res) => {
    console.log(`Status code:     ${res.statusCode}`);
    console.log(`Status message:  ${res.statusMessage}`);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Response body:', data);
    });
});

req.on('error', (e) => {
    console.log('Error: ', e.message);
});

req.write(postData);
req.end();