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
  await redis.set('counter', 0);

  const startIncr = Date.now();
  for (let i = 0; i < 10000; i++) {
    await redis.incr('counter');
  }
  const endIncr = Date.now();
  console.log(`Время выполнения 10000 запросов incr: ${endIncr - startIncr}ms`);

  const startDecr = Date.now();
  for (let i = 0; i < 10000; i++) {
    await redis.decr('counter');
  }
  const endDecr = Date.now();
  console.log(`Время выполнения 10000 запросов decr: ${endDecr - startDecr}ms`);

  redis.quit();
}

benchmark();
