using BookstoreAPI.Application.CQRS.Commands.DeleteBook;
using BookstoreAPI.Application.Exceptions;
using BookstoreAPI.Domain.Entities;
using BookstoreAPI.Infrastructure;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.controllers
{
    public class DeleteBookTest
    {
        private readonly BookContext _dbContext;
        private readonly DeleteBookHandler _handler;

        public DeleteBookTest()
        {
            // Set up InMemory Database
            var options = new DbContextOptionsBuilder<BookContext>()
                .UseInMemoryDatabase(databaseName: "TestBookstoreDb")
                .Options;

            _dbContext = new BookContext(options);
            _handler = new DeleteBookHandler(_dbContext);
        }

        [Fact]
        public async Task Handle_ShouldThrowKeyNotFoundException_WhenBookNotFound()
        {
            // Arrange
            var command = new DeleteBookCommand(999); // ID that does not exist

            // Act & Assert
            await Assert.ThrowsAsync<BookNotFoundException>(() => _handler.Handle(command, CancellationToken.None));
        }

        [Fact]
        public async Task Handle_ShouldMarkBookAsDeleted_WhenBookFound()
        {
            // Arrange
            var book = new Book
            {
                Author = "Author Name",
                Title = "Book Title"
            };

            // Add book to the in-memory database
            _dbContext.Book.Add(book);
            await _dbContext.SaveChangesAsync();

            var command = new DeleteBookCommand(book.Id);

            // Act
            var result = await _handler.Handle(command, CancellationToken.None);

            // Assert
            result.Should().NotBeNull();
            result.IsDeleted.Should().BeTrue();

            // Ensure the book is actually updated in the database (not removed, since you mark it as deleted)
            var dbBook = await _dbContext.Book.FindAsync(book.Id);
            dbBook.Should().NotBeNull();
            dbBook.IsDeleted.Should().BeTrue();
        }
    }
}
