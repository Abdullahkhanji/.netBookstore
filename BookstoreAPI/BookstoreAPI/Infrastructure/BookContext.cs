using BookstoreAPI.Application.Interfaces;
using BookstoreAPI.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookstoreAPI.Infrastructure
{
    public class BookContext : DbContext , IBookContext
    {
        public BookContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new Configurations.BookConfiguration());

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Book> Book => Set<Book>();
    }
}
