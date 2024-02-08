const Redis = require('ioredis');

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379
});

redis.on('connect', () => {
  console.log('Успешное подключение к Redis');
  checkConnection();
});

redis.on('error', (error) => {
  console.error('Ошибка подключения к Redis:', error);
  redis.quit();
});

async function checkConnection() {
  try {
    const result = await redis.ping();
    console.log('Соединение с Redis успешно:', result === 'PONG');
  } catch (error) {
    console.error('Ошибка при проверке соединения:', error);
  } finally {
    //redis.quit();
  }
}


