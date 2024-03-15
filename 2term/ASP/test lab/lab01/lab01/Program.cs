using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;

internal class Program
{
    static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var app = builder.Build();

        app.MapGet("/{id}.liv", (string? parmA, string? parmB) =>
        {
            return $"GET-Http-LIV:ParmA={parmA ?? "undefined"},ParmB={parmB ?? "undefined"}";
        });

        app.MapPost("/{id}.liv", (string? parmA, string? parmB) =>
        {
            return $"POST-Http-LIV:ParmA={parmA ?? "undefined"},ParmB={parmB ?? "undefined"}";
        });

        app.MapPut("/{id}.liv", (string? parmA, string? parmB) =>
        {
            return $"PUT-Http-LIV:ParmA={parmA ?? "undefined"},ParmB={parmB ?? "undefined"}";
        });

        app.MapPost("/getSumParams", (string? x, string? y) =>
        {
            if (!float.TryParse(x, out var xValue)) return "the value of x is not a number";
            if (!float.TryParse(y, out var yValue)) return "the value of y is not a number";
            float sum = xValue + yValue;

            return sum.ToString();
        });

        app.MapGet("multiplyParams", (HttpContext context) =>
        {
            if (!float.TryParse(context.Request.Query["x"], out var xValue)) return context.Response.WriteAsync("the value of x is not a number");
            if (!float.TryParse(context.Request.Query["y"], out var yValue)) return context.Response.WriteAsync("the value of y is not a number");

            var htmlContent = System.IO.File.ReadAllText("./views/sendMultiply.html");

            context.Response.Headers.Add("Content-Type", "text/html");

            return context.Response.WriteAsync(htmlContent);
        });

        app.MapPost("getMultiplyParams", (string? x, string? y) =>
        {
            if (!float.TryParse(x, out var xValue)) return "the value of x is not a number";
            if (!float.TryParse(y, out var yValue)) return "the value of y is not a number";

            return (xValue * yValue).ToString();
        });

        app.MapGet("calculator", (context) =>
        {
            var htmlContent = System.IO.File.ReadAllText("./Views/calculator.html");

            context.Response.Headers.Add("Content-Type", "text/html");

            return context.Response.WriteAsync(htmlContent);
        });

        app.MapPost("calculateMultiply", (HttpContext context) =>
        {
            if (!float.TryParse(context.Request.Form["x"][0], out var xValue)) return context.Response.WriteAsync("the value of x is not a number");
            if (!float.TryParse(context.Request.Form["y"][0], out var yValue)) return context.Response.WriteAsync("the value of y is not a number");

            return context.Response.WriteAsync((xValue * yValue).ToString());
        });

        app.Run();
    }
}



