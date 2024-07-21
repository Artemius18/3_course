using Microsoft.AspNetCore.Mvc;

namespace ASPMVC07.Controllers
{
    [Route("it")]
    public class TAResearch : Controller
    {
        [HttpGet]
        //тут убрать длину
        [Route("{num:int}/{str:maxlength(32)}")]
        public ActionResult M04(int num, string str)
        {
            return Content($"{Request.Method}:M04:/{num}/{str}");
        }

        [HttpGet]
        [HttpPost]
        [Route("{b:bool}/{letters:alpha}")]
        public ActionResult M05(bool b, string letters)
        {
            return Content($"{Request.Method}:M05:/{b}/{letters}");
        }

        [HttpGet]
        [HttpDelete]
        [Route("{f:float}/{str:minlength(2):maxlength(5)}", Order = 1)]
        public ActionResult M06(float f, string str)
        {
            return Content($"{Request.Method}:M06:/{f}/{str}");
        }

        [HttpPut]
        [Route("{letters:alpha:minlength(3):maxlength(4)}/{n:int:range(100,200)}")]
        public ActionResult M07(int? n, string? letters)
        {
            return Content($"{Request.Method}:M07:/{letters}/{n}");
        }

        [HttpPost]
        [Route("{mail:regex(^\\S+@\\S+\\.\\S+$)}")]
        public ActionResult M08(string? mail)
        {
            return Content($"{Request.Method}:M08:/{mail}");
        }
    }
}