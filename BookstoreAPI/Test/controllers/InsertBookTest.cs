using Moq;
using Xunit;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;
using BookstoreAPI.Application.CQRS.Commands.InsertBook;
using BookstoreAPI.Application.Interfaces;
using BookstoreAPI.Domain.Entities;
using BookstoreAPI.Infrastructure;

namespace Test
{
    public class InsertBookTest
    {
        private readonly BookContext _context;
        private readonly InsertBookHandler _itemService;

        public InsertBookTest()
        {
            var options = new DbContextOptionsBuilder<BookContext>()
                            .UseInMemoryDatabase(databaseName: "TestBookstoreDb")
                            .Options;

            _context = new BookContext(options);

            _itemService = new InsertBookHandler(_context);
        }

        [Fact]
        public async Task Handle_ShouldInsertBook_WhenValidBookIsProvided()
        {
            // Arrange
            var book = new Book { Id = 1, Title = "Test Book" };
            var command = new InsertBookCommand(book);

            // Act
            var result = await _itemService.Handle(command, CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(book.Id, result.Id);

            var insertedBook = await _context.Book.FirstOrDefaultAsync(b => b.Id == book.Id);
            Assert.NotNull(insertedBook);
            Assert.Equal(book.Title, insertedBook.Title);
        }

    }
}
