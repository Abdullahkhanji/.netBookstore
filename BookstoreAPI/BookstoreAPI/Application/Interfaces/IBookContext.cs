using Microsoft.EntityFrameworkCore;
using BookstoreAPI.Domain.Entities;

namespace BookstoreAPI.Application.Interfaces
{
    public interface IBookContext
    {
        public DbSet<Book> Book { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
