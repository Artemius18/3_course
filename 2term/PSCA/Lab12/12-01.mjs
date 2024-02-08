import { createClient } from 'redis';

const client = createClient({
    host: 'localhost', 
    port: 6379
}).on('error', (err) => console.error(err)); 

client.on('connect', ()=> console.log('connect')); 
client.on('ready', () => console.log('ready')); 
client.on('end',()=> console.log('end'));

await client.connect(); 
client.quit();