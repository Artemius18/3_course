using Microsoft.EntityFrameworkCore;

namespace L4;

public class DbInitializer
{
    public static void Initialize(Models.UswrDb context)
    {
        context.Database.Migrate();
        if (context.WSRefs != null && context.WSRefComments != null)
        {
            if (!context.WSRefs.Any() && !context.WSRefComments.Any())
            {
                context.WSRefs.AddRange(
                    new Models.WSRef { Url = "https://www.belstu.by", Description = "Oracle, Java", Minus = 1, Plus = 1 },
                    new Models.WSRef { Url = "https://www.belstu.by", Description = "Microsoft, C#", Minus = 2, Plus = 2 },
                    new Models.WSRef { Url = "https://www.belstu.by", Description = "BSTU, FIT", Minus = 3, Plus = 3 }
                );
                context.SaveChanges();
                foreach (Models.WSRef r in context.WSRefs)
                {
                    context.WSRefComments.Add(new Models.WSRefComment { WSRefId = r.Id, ComText = "Comment-1", Stamp = DateTime.Now, SessionId = "init", WSRef = r });
                }
                context.SaveChanges();
            }
        }
    }
}