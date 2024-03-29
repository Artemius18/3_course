using System.Net.WebSockets;
using System.Net;
using System.Text;

internal class Program
{
    static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var app = builder.Build();

        app.UseWebSockets(); // Включаем поддержку веб-сокетов

        // Маршрут для обработки запросов на установку соединения через веб-сокет
        app.MapGet("/websocket", async (HttpContext context) =>
        {
            if (context.WebSockets.IsWebSocketRequest) // Проверяем, что запрос содержит заголовок "Upgrade" с значением "websocket"
            {
                using var webSocket = await context.WebSockets.AcceptWebSocketAsync(); // Принимаем соединение
                await OnConnected(webSocket); // Обрабатываем соединение
            }
            else context.Response.StatusCode = (int)HttpStatusCode.BadRequest; // Возвращаем ошибку, если запрос не содержит веб-сокет заголовок
        });

        // Метод для обработки соединения через веб-сокет
        async Task OnConnected(WebSocket webSocket)
        {
            try
            {
                while (webSocket.State == WebSocketState.Open) // Пока соединение открыто
                {
                    var buffer = new ArraySegment<byte>(Encoding.UTF8.GetBytes(DateTime.Now.ToString("HH:mm:ss"))); // Получаем текущее время и конвертируем его в массив байтов
                    await webSocket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None); // Отправляем текущее время клиенту
                    await Task.Delay(2000); // Ждем 2 секунды перед отправкой следующего сообщения
                }
            }
            catch (Exception ex)
            {
                var buffer = new ArraySegment<byte>(Encoding.UTF8.GetBytes(ex.Message)); // Конвертируем сообщение об ошибке в массив байтов
                await webSocket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None); // Отправляем сообщение об ошибке клиенту
            }
        }

        app.UseDefaultFiles();
        app.UseStaticFiles();

        app.Run(); // Запускаем приложение
    }
}
