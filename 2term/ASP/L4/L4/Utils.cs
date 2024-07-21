using L4.Models;

namespace L4;

public static class Utils
{
    public const string IS_ADMINISTRATOR_NAME = "isAdmin";

    public static void SetIsAdministrator(HttpContext context, bool isAdministartor) => context.Session.SetInt32(IS_ADMINISTRATOR_NAME, isAdministartor ? 1 : 0);
    public static bool IsAdministrator(HttpContext context) => context.Session.GetInt32(IS_ADMINISTRATOR_NAME) == 1;
    public static bool OwnsComment(HttpContext context, WSRefComment comment)
    {
        return context.Session.Id == comment.SessionId;
    }
    public static void EnsureSessionInited(HttpContext context)
    {
        context.Session.SetInt32("temp", 1);
        context.Session.Remove("temp");
    }
}