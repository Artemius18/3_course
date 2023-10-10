// const http = require("http");
// const url = require("url");

// // Функция для расчета факториала
// function factorial(n) {
//   if (n <= 1) {
//     return 1;
//   } else {
//     return n * factorial(n - 1);
//   }
// }

// //http://localhost:5000/fact?k=3
// http
//   .createServer((req, res) => {
//     const query = url.parse(req.url, true).query; //парсим наш url
//     const k = parseInt(query.k); //а затем извлекаем k

//     if (isFinite(k)) {
//       const fact = factorial(k);

//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ k: k, fact: fact }));
//     } else {
//       res.writeHead(400, { "Content-Type": "text/plain" });
//       res.end("Oops. something get wrong...");
//     }
//   })
//   .listen(5001, "localhost");

// console.log("Сервер запущен на http://localhost:5001");

const http = require("http");
const url = require("url");

// Функция для расчета факториала
function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

http
  .createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    const path = url.parse(req.url, true).pathname;

    if (path === "/fact") {
      const k = parseInt(query.k);

      if (!isNaN(k)) {
        const fact = factorial(k);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ k: k, fact: fact }));
      } else {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Oops. something get wrong...");
      }
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
      <!DOCTYPE html>
      <html>
      <body>
        <div id="results"></div>
        <script>
          const resultsDiv = document.getElementById('results');
          const start = Date.now();

          for (let x = 1; x <= 20; x++) {
            fetch('http://localhost:5000/fact?k=' + x)
              .then(response => response.json())
              .then(data => {
                const t = Date.now() - start;
                resultsDiv.innerHTML += 't: ' + t + ', k: ' + data.k + ', fact: ' + data.fact + '<br>';
              });
          }
        </script>
      </body>
      </html>
    `);
    }
  })
  .listen(5001, "localhost");

console.log("Сервер запущен на http://localhost:5001");
