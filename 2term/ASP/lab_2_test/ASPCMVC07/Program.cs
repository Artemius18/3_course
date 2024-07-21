namespace ASPCMVC07
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddRazorPages();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
            }
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapRazorPages();

            app.MapControllers();


            app.Run();
        }
    }
}

//UseRouting добавляет соответствие маршрута в конвейер ПО промежуточного слоя. 
//Это ПО промежуточного слоя обращается к набору конечных точек, определенных в приложении, 
//и выбирает наиболее подходящее на основе запроса.

//UseEndpoints добавляет выполнение конечной точки в конвейер ПО промежуточного слоя. 
//Он запускает делегат, связанный с выбранной конечной точкой.