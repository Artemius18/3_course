  const TelegramBot = require('node-telegram-bot-api');
  const axios = require('axios');
  const cron = require('node-cron');
  const fs = require('fs');
  const path = require('path');
  const puppeteer = require('puppeteer');
  const request = require('request');
  const sql = require('mssql');


  const token = '7017747242:AAHiod1t-vI8Y3sUexpZFpFLB7lkP7tV0Qc';

  const bot = new TelegramBot(token, {polling: true});

  const config = {
    user: 'user',
    password: '123',
    server: 'localhost',
    database: 'TelegramBotDB',
    options: {
      trustServerCertificate: true 
    }
  };

  sql.connect(config).then(() => {
    console.log('Connected to SQL Server successfully');
  }).catch(err => {
    console.error('Error connecting to SQL Server:', err);
  });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (text.toLowerCase() !== 'привет') {
      bot.sendMessage(chatId, text);
    }
  });
  
  // Подписка
  bot.onText(/\/subscribe/, (msg) => {
    const chatId = msg.chat.id;
    const request = new sql.Request();
    request.query(`SELECT * FROM Subscribers WHERE ChatId = ${chatId}`, (err, result) => {
      if (err) {
        console.error('Ошибка при попытке извлечь данные из БД:', err);
        bot.sendMessage(chatId, 'Ошибка при попытке подписаться на ежедневную рассылку!');
      } else if (result.recordset.length > 0) {
        bot.sendMessage(chatId, 'Вы уже подписаны на ежедневную рассылку!');
      } else {
        const insertRequest = new sql.Request();
        insertRequest.query(`INSERT INTO Subscribers (ChatId) VALUES (${chatId})`, (insertErr, insertResult) => {
          if (insertErr) {
            console.error('Ошибка при вставке данных в таблицу Subscribers:', insertErr);
            bot.sendMessage(chatId, 'Ошибка при попытке подписаться на ежедневную рассылку!');
          } else {
            bot.sendMessage(chatId, 'Вы подписались на ежедневную рассылку случайного факта.');
          }
        });
      }
    });
  });


  // Отписка
  bot.onText(/\/unsubscribe/, (msg) => {
    const chatId = msg.chat.id;
    const request = new sql.Request();
    request.query(`DELETE FROM Subscribers WHERE ChatId = ${chatId}`, (err, result) => {
      if (err) {
        console.error('Ошибка при удалении из таблицы Subscribers:', err);
        bot.sendMessage(chatId, 'Ошибка при попытке отписаться от ежедневной рассылки');
      } else {
        bot.sendMessage(chatId, 'Вы отписались от ежедневной рассылки случайного факта.');
      }
    });
  });

  // Отправка фактов
  // cron.schedule('*/5 * * * *', () => {
  //   const request = new sql.Request();
  //   request.query(`SELECT ChatId FROM Subscribers`, (err, result) => {
  //     if (err) {
  //       console.error('Error fetching subscribers:', err);
  //     } else {
  //       result.recordset.forEach(row => {
  //         const chatId = row.ChatId;
  //         axios.get('https://api.api-ninjas.com/v1/facts', {
  //           headers: {
  //             'X-Api-Key': 'etIh2Zl310SQO2MkPLqG9EbthRiy1xugFITUyn0l'
  //           }
  //         })
  //         .then(response => {
  //           const fact = response.data[0].fact;
  //           bot.sendMessage(chatId, 'Fact: ' + fact)
  //             .then(() => console.log('Fact sent to chat', chatId))
  //             .catch(err => console.error('Error sending message to chat', chatId, err));
  //         })
  //         .catch(error => {
  //           console.error('Request failed:', error);
  //         });
  //       });
  //     }
  //   });
  // });
  // Sending facts every 5 seconds
  setInterval(() => {
    const request = new sql.Request();
    request.query(`SELECT ChatId FROM Subscribers`, (err, result) => {
      if (err) {
        console.error('Error fetching subscribers:', err);
      } else {
        result.recordset.forEach(row => {
          const chatId = row.ChatId;
          axios.get('https://api.api-ninjas.com/v1/facts', {
            headers: {
              'X-Api-Key': 'etIh2Zl310SQO2MkPLqG9EbthRiy1xugFITUyn0l'
            }
          })
          .then(response => {
            const fact = response.data[0].fact;
            bot.sendMessage(chatId, 'Fact: ' + fact)
              .then(() => console.log('Fact sent to chat', chatId))
              .catch(err => console.error('Error sending message to chat', chatId, err));
          })
          .catch(error => {
            console.error('Request failed:', error);
          });
        });
      }
    });
  }, 5000); // Sending a fact every 5 seconds



  // Отправка стикера
  bot.onText(/привет/, (msg) => {
    const chatId = msg.chat.id;
    if (msg.text.toLowerCase() === 'привет' ) {
      const stickerFileId = 'CAACAgIAAxkBAAEFTXZmPMDYVsZQLomuPOtLyWkzgSrgcwACVAADQbVWDGq3-McIjQH6NQQ';
      bot.sendSticker(chatId, stickerFileId).catch(error => {
        console.error('Error while sending sticker:', error);
      });
  }
  });

  bot.onText(/\/weather (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const city = match[1]; 

    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=626036a103ab6d6ca0338a5be06b1c2d`)
      .then(response => {
        const { temp, humidity, pressure } = response.data.main;
        const { speed } = response.data.wind;
        const { description } = response.data.weather[0];
        const { sunrise, sunset } = response.data.sys;
        const daylightDuration = calculateDaylightDuration(sunrise, sunset);

        const temperatureCelsius = Math.round(temp);
        const pressureMmHg = Math.round(pressure * 0.750062);

        bot.sendMessage(chatId, `Погода в ${city}: \n🌡️Температура: ${temperatureCelsius}°C\n💧Влажность: ${humidity}%\n💨Скорость ветра: ${speed} м/c\n📝Описание: ${description}\n📊Давление: ${pressureMmHg} мм рт. ст.\n🌅Восход солнца: ${formatTime(sunrise)}\n🌇Закат солнца: ${formatTime(sunset)}\n⏳Продолжительность дня: ${formatDuration(daylightDuration)}`);
      })
      .catch(error => {
        console.log(error);
        bot.sendMessage(chatId, "Произошла ошибка при получении информации о погоде.");
      });
  });


  // Отправка случайной шутки
  bot.onText(/\/joke/, (msg) => {
    const chatId = msg.chat.id;
    request.get({
      url: 'https://api.api-ninjas.com/v1/jokes',
      headers: {
        'X-Api-Key': 'etIh2Zl310SQO2MkPLqG9EbthRiy1xugFITUyn0l'
      },
    }, function(error, response, body) {
      if(error) {
        console.error('Request failed:', error);
        bot.sendMessage(chatId, 'Произошла ошибка при получении шутки');
      } else if(response.statusCode !== 200) {
        console.error('Произошла ошибка при получении шутки:', response.statusCode, body.toString('utf8'));
        bot.sendMessage(chatId, 'Error');
      } else {
        const joke = JSON.parse(body)[0].joke;
        bot.sendMessage(chatId, 'Joke: ' + joke)
          .then(() => console.log('Joke sent to chat', chatId))
          .catch(err => console.error('Error sending joke to chat', chatId, err));
      }
    });
  });


  //Отправка случайного изображения кота
  bot.onText(/\/cat/, (msg) => {
    const chatId = msg.chat.id;
    
    // Отправка запроса к API для получения изображения кота
    request.get('https://api.thecatapi.com/v1/images/search', (error, response, body) => {
      if (error) {
        console.error('Request failed:', error);
        bot.sendMessage(chatId, 'Произошла ошибка при получении изображения кота.');
      } else if (response.statusCode !== 200) {
        console.error('Error:', response.statusCode, body.toString('utf8'));
        bot.sendMessage(chatId, 'Произошла ошибка при получении изображения кота.');
      } else {
        try {
          const catData = JSON.parse(body);
          const imageUrl = catData[0].url; // URL изображения кота
          
          // Отправка изображения кота в чат
          bot.sendPhoto(chatId, imageUrl)
            .then(() => console.log('Cat photo sent to chat', chatId))
            .catch(err => console.error('Error sending cat photo to chat', chatId, err));
        } catch (err) {
          console.error('Error parsing JSON:', err);
          bot.sendMessage(chatId, 'Произошла ошибка при обработке ответа от API.');
        }
      }
    });
  });


  // Функция для вычисления продолжительности дня
  function calculateDaylightDuration(sunrise, sunset) {
    return sunset - sunrise;
  }

  // Функция для форматирования времени в формат ЧЧ:ММ
  function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Функция для форматирования продолжительности в формат ЧЧ:ММ
  function formatDuration(duration) {
    const hours = Math.floor(duration / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((duration % 3600) / 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }