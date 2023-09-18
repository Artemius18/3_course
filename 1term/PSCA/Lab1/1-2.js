const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  let requestBody = "";

  req.on("data", (someinf) => {
    requestBody += someinf;
  });

  req.on("end", () => {
    const responseHtml = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>Request Information</title>
        </head>
        <body>
          <h1>Request Information</h1>
          <p>Метод: ${req.method}</p>
          <p>URI: ${req.url}</p>
          <p>Версия протокола: ${req.httpVersion}</p>
          <h2>Заголовки запроса:</h2>
          <pre>${JSON.stringify(req.headers, null, 2)}</pre>
          <h2>Тело запроса: ${requestBody}</h2>
        </body>
      </html>
    `;

    res.end(responseHtml);
  });
});

const port = 5000;
const hostname = "127.0.0.1";

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});
