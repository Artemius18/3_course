const http = require("http");
const fs = require("fs");
const route = "xmlhttprequest";

http
  .createServer((request, response) => {
    const html = "./xmlhttprequest.html";
    if (request.url === "/api/name") {
      response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      response.end("Пшенко Артем Федорович");
    } else if (request.url === "/xmlhttprequest") {
      fs.readFile(html, (err, data) => {
        response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        if (err != null) {
          console.log("error:" + err);
        } else {
          response.end(data);
        }
      });
    } else {
      response.end(
        "<html><body><h1>Visit localhost:5000/" +
          route +
          " to get access</h1></body></html>"
      );
    }
  })
  .listen(5000, () =>
    console.log("Server running at http://localhost:5000/xmlhttprequest")
  );
