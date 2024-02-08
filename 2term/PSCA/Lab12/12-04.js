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
  const startHSet = Date.now();
  for (let i = 0; i < 10000; i++) {
    await redis.hset(`hash${i}`, 'field', `value${i}`);
  }
  const endHSet = Date.now();
  console.log(`Время выполнения 10000 запросов hset: ${endHSet - startHSet}ms`);

  const startHGet = Date.now();
  for (let i = 0; i < 10000; i++) {
    await redis.hget(`hash${i}`, 'field');
  }
  const endHGet = Date.now();
  console.log(`Время выполнения 10000 запросов hget: ${endHGet - startHGet}ms`);

  redis.quit();
}

benchmark();
