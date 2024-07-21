using Microsoft.EntityFrameworkCore;

namespace L4.Models
{
    public class UswrDb : DbContext
    {
        public DbSet<WSRef> WSRefs { get; set; } = null!;
        public DbSet<WSRefComment> WSRefComments { get; set; } = null!;
        public UswrDb(DbContextOptions<UswrDb> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
