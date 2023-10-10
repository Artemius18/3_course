const http = require("http");
const readline = require("readline");

let state = "norm";

//интерфейс для ввода с консоли
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Input new state (norm, stop, test, idle, exit): ",
});

//запрашиваем ввод
rl.prompt();

//в зависимости от состояния выводим страницу
rl.on("line", (line) => {
  switch (line.trim().toLowerCase()) {
    case "norm":
    case "stop":
    case "test":
    case "idle":
      state = line.trim();
      break;
    case "exit":
      process.exit(0);
    default:
      console.log(`Неизвестное состояние: '${line.trim().toLowerCase()}'`);
  }
  rl.prompt();
}).on("close", () => {
  process.exit(0);
});

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`${state}`);
  })
  .listen(5000, "localhost");

console.log("Сервер запущен на http://localhost:5000");
