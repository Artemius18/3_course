using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using L4.Models;

namespace L4.Pages
{
    public class IndexModel(UswrDb context) : PageModel
    {
        private readonly UswrDb _context = context;
        [BindProperty]
        public string LinksFindText { get; set; } = string.Empty;
        [BindProperty]
        public WSRef CreateLink { get; set; } = null!;
        [BindProperty]
        public WSRef EditLink { get; set; } = null!;

        public IList<WSRef> Links { get; set; } = null!;
        public IList<WSRef> FindLinks { get; set; } = null!;

        public IList<WSRef> FindMatchingLinks(IList<WSRef> links, string[] searchTags)
        {
            List<WSRef> matchingLinks = [];

            foreach (var link in links)
            {
                string[] tagsLink = link.Description.Split(',').Select(tag => tag.Trim()).ToArray();
                if (tagsLink.Any(tag => searchTags.Contains(tag)))
                {
                    matchingLinks.Add(link);
                }
            }

            return matchingLinks;
        }

        public async Task<IActionResult> ToggleUserRole()
        {
            Links = await _context.WSRefs.ToListAsync();
            FindLinks = Links;

            Utils.SetIsAdministrator(HttpContext, !Utils.IsAdministrator(HttpContext));
            return Page();
        }
        public async Task<IActionResult> GetFilterLinks()
        {
            Links = await _context.WSRefs.ToListAsync();
            FindLinks = string.IsNullOrWhiteSpace(LinksFindText)
                ? Links
                : FindMatchingLinks(Links, [.. LinksFindText.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)]);
            return Page();
        }
        public async Task<IActionResult> CreateLinkForm()
        {
            CreateLink.Plus = 0;
            CreateLink.Minus = 0;
            if (CreateLink == null)
            {
                Links = await _context.WSRefs.ToListAsync();
                FindLinks = Links;
                return Page();
            }

            _context.WSRefs.Add(CreateLink);
            await _context.SaveChangesAsync();
            Links = await _context.WSRefs.ToListAsync();
            FindLinks = Links;
            return Page();
        }
        public async Task<IActionResult> DeleteLink(int linkId)
        {
            var link = await _context.WSRefs.FindAsync(linkId);
            if (link != null)
            {
                _context.WSRefs.Remove(link);
                await _context.SaveChangesAsync();
            }
            Links = await _context.WSRefs.ToListAsync();
            FindLinks = Links;
            return Page();
        }
        public async Task<IActionResult> EditLinkForm(int linkId)
        {
            var link = await _context.WSRefs.FindAsync(linkId);

            if (link != null)
            {
                link.Url = EditLink.Url;
                link.Description = EditLink.Description;
                _context.Attach(link).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            Links = await _context.WSRefs.ToListAsync();
            FindLinks = Links;
            return Page();
        }
        public async Task<IActionResult> OnPostAsync(string handler, int linkId)
        {
            return handler switch
            {
                "ToggleUserRole" => await ToggleUserRole(),
                "GetFilterLinks" => await GetFilterLinks(),
                "CreateLink" => await CreateLinkForm(),
                "DeleteLink" => await DeleteLink(linkId),
                "EditLink" => await EditLinkForm(linkId),
                _ => RedirectToPage("./Index"),
            };
        }

        public async Task<IActionResult> OnGetAsync()
        {
            Links = await _context.WSRefs.ToListAsync();
            FindLinks = Links;
            return Page();
        }
    }
}
