const http = require("http");
const fs = require("fs");
const path = require("path");

http
  .createServer(function (request, response) {
    if (request.url === "/html") {
      fs.readFile(
        path.join(__dirname, "index.html"), //dirname - путь к текущему рабочему каталогу скрипта
        "utf-8",
        function (error, content) {
          if (error) {
            response.writeHead(500);
            response.end(`Oooops, something get wrong: ${error.code} ..\n`);
          } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end(content, "utf-8");
          }
        }
      );
    }
  })
  .listen(5000);

console.log("Server running at http://localhost:5000/html");
