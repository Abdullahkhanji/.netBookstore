using Microsoft.EntityFrameworkCore;

namespace BookstoreAPI.Modals
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Book> Book { get; set; }
    }
}
