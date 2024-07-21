using Microsoft.AspNetCore.Builder;

namespace ASPCMVC06
{
    //{controller}/{action}/{id?}
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
            //добавляет компонент EndpointRoutingMiddleware
            app.UseRouting(); 


            app.MapRazorPages();

#pragma warning disable ASP0014 // Suggest using top level route registrations
            //добавляем компонент EndpointMiddleware, EndpointRoutingMiddleware
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "M01",
                    pattern: "MResearch/M01/1/",
                    defaults: new { controller = "TMResearch", action = "M01" });
                    
                endpoints.MapControllerRoute(
                    name: "M01",
                    pattern: "MResearch/M01/",
                    defaults: new { controller = "TMResearch", action = "M01" });

                endpoints.MapControllerRoute(
                    name: "M01",
                    pattern: "MResearch/",
                    defaults: new { controller = "TMResearch", action = "M01" });

                endpoints.MapControllerRoute(
                    name: "M01",
                    pattern: "/",
                    defaults: new { controller = "TMResearch", action = "M01" });

                endpoints.MapControllerRoute(
                    name: "M01",
                    pattern: "V2/MResearch/M01/",
                    defaults: new { controller = "TMResearch", action = "M01" });

                endpoints.MapControllerRoute(
                    name: "M01",
                    pattern: "V3/MResearch/{value}/M01",
                    defaults: new { controller = "TMResearch", action = "M01" });


                endpoints.MapControllerRoute(
                    name: "M02",
                    pattern: "V2",
                    defaults: new { controller = "TMResearch", action = "M02" });

                endpoints.MapControllerRoute(
                    name: "M02",
                    pattern: "V2/MResearch",
                    defaults: new { controller = "TMResearch", action = "M02" });

                endpoints.MapControllerRoute(
                    name: "M02",
                    pattern: "V2/MResearch/M02",
                    defaults: new { controller = "TMResearch", action = "M02" });

                endpoints.MapControllerRoute(
                    name: "M02",
                    pattern: "/MResearch/M02",
                    defaults: new { controller = "TMResearch", action = "M02" });

                endpoints.MapControllerRoute(
                    name: "M02",
                    pattern: "V3/MResearch/{value}/M02",
                    defaults: new { controller = "TMResearch", action = "M02" });

                endpoints.MapControllerRoute(
                    name: "M03",
                    pattern: "V3",
                    defaults: new { controller = "TMResearch", action = "M03" });

                endpoints.MapControllerRoute(
                    name: "M03",
                    pattern: "V3/MResearch/{value}/",
                    defaults: new { controller = "TMResearch", action = "M03" });

                endpoints.MapControllerRoute(
                    name: "M03",
                    pattern: "V3/MResearch/{value}/M03",
                    defaults: new { controller = "TMResearch", action = "M03" });

                endpoints.MapControllerRoute(
                     name: "MXX",
                     pattern: "{*url}",
                     defaults: new { controller = "TMResearch", action = "MXX" });
            });
#pragma warning restore ASP0014 // Suggest using top level route registrations

            app.Run();
        }
    }
}
