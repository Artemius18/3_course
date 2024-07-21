using Microsoft.AspNetCore.Mvc;

namespace ASPCMVC07;

public class CalcController : Controller
{
    [AcceptVerbs(["GET", "POST"])]
    public ViewResult Index()
    {
        return View("Calc");
    }

    [AcceptVerbs(["GET", "POST"])]
    public ViewResult Sum(string? xStr, string? yStr)
    {
        const string press = "+";
        return Request.Method == "POST" ? PerformOperator(press, (a, b) => a + b, xStr, yStr) : GetOperatorView(press, xStr, yStr);
    }

    [AcceptVerbs(["GET", "POST"])]
    public ViewResult Sub(string? xStr, string? yStr)
    {
        const string press = "-";
        return Request.Method == "POST" ? PerformOperator(press, (a, b) => a - b, xStr, yStr) : GetOperatorView(press, xStr, yStr);
    }

    [AcceptVerbs(["GET", "POST"])]
    public ViewResult Mul(string? xStr, string? yStr)
    {
        const string press = "*";
        return Request.Method == "POST" ? PerformOperator(press, (a, b) => a * b, xStr, yStr) : GetOperatorView(press, xStr, yStr);
    }

    [AcceptVerbs(["GET", "POST"])]
    public ViewResult Div(string? xStr, string? yStr)
    {
        const string press = "/";
        return Request.Method == "POST" ? PerformOperator(press, (a, b) => a / b, xStr, yStr) : GetOperatorView(press, xStr, yStr);
    }

    private ViewResult GetOperatorView(string press, string? xStr, string? yStr)
    {
        ViewBag.press = press;
        if (xStr is null && yStr is null)
        {
            ViewBag.x = ViewBag.y = ViewBag.z = 0;
        }
        return View("Calc");
    }
    private ViewResult PerformOperator(string press, Func<float, float, float> op, string? xStr, string? yStr)
    {
        ViewBag.press = press;
        try
        {
            bool xIsValid = float.TryParse(xStr, out var x);
            bool yIsValid = float.TryParse(yStr, out var y);
            ViewBag.x = xIsValid ? x : 0;
            ViewBag.y = yIsValid ? y : 0;
            if (!xIsValid)
            {
                throw new ArgumentException("x is invalid");
            }
            if (!yIsValid)
            {
                throw new ArgumentException("y is invalid");
            }
            ViewBag.z = op(x, y);
        }
        catch (Exception err)
        {
            ViewBag.z = null;
            ViewBag.Error = $"-- ERROR: {err.Message} --";
        }
        return View("Calc");
    }
}
