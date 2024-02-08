const Redis = require('ioredis');

const pub = new Redis({
    host: '127.0.0.1',
    port: 6379
});
const sub = new Redis({
    host: '127.0.0.1',
    port: 6379
});

pub.on('connect', () => {
  console.log('Успешное подключение к Redis (pub)');
});

pub.on('error', (error) => {
  console.error('Ошибка подключения к Redis (pub):', error);
  pub.quit();
});

sub.on('connect', () => {
    console.log('Успешное подключение к Redis (sub)');

    sub.subscribe('channel', (err, count) => {
        if (err) {
            console.error('Ошибка подписки:', err);
            sub.quit();
        } else {
            console.log(`Подписано на ${count} каналов`);

            pub.publish('channel', 'hello, world!', (err, reply) => {
                if (err) {
                    console.error('Ошибка публикации:', err);
                } else {
                    console.log(`Сообщение отправлено: ${reply}`);
                }
                pub.quit();
                sub.quit();
            });
        }
    });
});

sub.on('error', (error) => {
    console.error('Ошибка подключения к Redis (sub):', error);
    sub.quit();
});

sub.on('message', (channel, message) => {
  console.log(`Получено сообщение от ${channel}: ${message}`);
});
