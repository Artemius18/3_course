using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ASPCMVC08.Controllers;

public class HomeController(UserManager<IdentityUser> userManager) : Controller
{
    public async Task<IActionResult> Index()
    {
        var user = await userManager.GetUserAsync(User);
        var roles = user != null ? await userManager.GetRolesAsync(user) ?? [] : [];

        ViewBag.roles = roles;

        return View();
    }
}