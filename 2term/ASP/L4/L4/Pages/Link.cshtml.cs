using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using L4.Models;

namespace L4.Pages
{
    public class LinksModel(UswrDb context) : PageModel
    {
        private readonly UswrDb _context = context;
        [BindProperty]
        public string NewCommentText { get; set; } = string.Empty;
        [BindProperty]
        public WSRefComment Comment { get; set; } = null!;
        public async Task<IActionResult> CreateComment(int id)
        {
            Utils.EnsureSessionInited(HttpContext);

            var link = _context.WSRefs!.Where(x => x.Id == id).FirstOrDefault();
            if (_context.WSRefComments == null || Comment == null || link == null)
            {
                return RedirectToPage("./Index");
            }
            Comment.SessionId = HttpContext.Session.Id;
            Comment.WSRef = link;
            _context.WSRefComments.Add(Comment);
            await _context.SaveChangesAsync();
            return RedirectToPage("./Link", new { id = link.Id });
        }
        public async Task<IActionResult> DeleteComment(int id, int commentId)
        {
            var comment = await _context.WSRefComments.FindAsync(commentId);
            var link = _context.WSRefs.Where(x => x.Id == id).FirstOrDefault();
            if (comment != null && link != null)
            {
                Comment = comment;
                _context.WSRefComments.Remove(comment);
                await _context.SaveChangesAsync();

                return RedirectToPage("./Link", new { id = link.Id });
            }

            return RedirectToPage("./Index");
        }
        public async Task<IActionResult> EditComment(int id, int commentId)
        {
            var comment = await _context.WSRefComments.FindAsync(commentId);
            var link = _context.WSRefs.Where(x => x.Id == id).FirstOrDefault();
            if (comment != null && link != null)
            {
                comment.ComText = NewCommentText;
                _context.Attach(comment).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return RedirectToPage("./Link", new { id = link.Id });
            }
            return RedirectToPage("./Index");
        }

        public WSRef Link { get; set; } = null!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.WSRefs == null)
            {
                return NotFound();
            }

            var link = await _context.WSRefs.Include(x => x.WSRefComments).FirstOrDefaultAsync(m => m.Id == id);
            if (link == null)
            {
                return NotFound();
            }
            else
            {
                Link = link;
            }
            return Page();
        }
        public async Task<IActionResult> OnPostAsync(string handler, int id, int commentId)
        {
            return handler switch
            {
                "OnPlus" => await OnPlus(id),
                "OnMinus" => await OnMinus(id),
                "CreateComment" => await CreateComment(id),
                "DeleteComment" => await DeleteComment(id, commentId),
                "EditComment" => await EditComment(id, commentId),
                _ => RedirectToPage("./Index"),
            };
        }

        public async Task<IActionResult> OnPlus(int id)
        {
            var linkDb = await _context.WSRefs.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (linkDb == null)
            {
                return Page();
            }
            linkDb.Plus++;
            await _context.SaveChangesAsync();
            return RedirectToPage("./Link", new { id = linkDb.Id });
        }

        public async Task<IActionResult> OnMinus(int id)
        {
            var linkDb = await _context.WSRefs.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (linkDb == null)
            {
                return Page();
            }
            linkDb.Minus++;
            await _context.SaveChangesAsync();
            return RedirectToPage("./Link", new { id = linkDb.Id });
        }
    }
}
