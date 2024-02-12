const Redis = require('ioredis');
const redis = new Redis({
  host: '127.0.0.1',
  port: 6379
});

redis.on('connect', () => {
  console.log('Успешное подключение к Redis');
});

redis.on('error', (error) => {
  console.error('Ошибка подключения к Redis:', error);
  redis.quit();
});


async function benchmark() {
    const startSet = Date.now();
    for (let i = 0; i < 10000; i++) {
      await redis.set(`key${i}`, `value${i}`);
    }
    const endSet = Date.now();
    console.log(`Время выполнения 10000 запросов set: ${endSet - startSet}ms`);
  
    const startGet = Date.now();
    for (let i = 0; i < 10000; i++) {
      const value = await redis.get(`key${i}`);
      //console.log(`key${i}: ${value}`); 
    }
    const endGet = Date.now();
    console.log(`Время выполнения 10000 запросов get: ${endGet - startGet}ms`);
  
    const startDel = Date.now();
    for (let i = 0; i < 10000; i++) {
      await redis.del(`key${i}`);
    }
    const endDel = Date.now();
    console.log(`Время выполнения 10000 запросов del: ${endDel - startDel}ms`);
  
    redis.quit();
  }
  
  
benchmark();
