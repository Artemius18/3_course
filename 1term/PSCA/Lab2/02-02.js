const http = require("http");
const fs = require("fs");
const path = require("path");

http
  .createServer(function (request, response) {
    if (request.url === "/png") {
      fs.readFile(path.join(__dirname, "pic.png"), function (error, content) {
        if (error) {
          response.writeHead(500);
          response.end(`Oooops, something get wrong: ${error.code} ..\n`);
        } else {
          response.writeHead(200, { "Content-Type": "image/png" });
          response.end(content);
        }
      });
    }
  })
  .listen(5000);

console.log("Server running at http://localhost:5000/png");
