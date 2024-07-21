const express = require('express');
const app = express();

// Middleware для обработки всех запросов
app.use((req, res, next) => {
  console.log(`Обработка запроса: ${req.method} ${req.url}`);
  next();
});

// Маршрут для генерации ошибки
app.get('/error', (req, res, next) => {
  next(new Error('Произошла ошибка!'));
});

// Middleware для обработки ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Произошла ошибка сервера!');
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});

