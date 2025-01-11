using BookstoreAPI.Application.Interfaces;
using BookstoreAPI.Application.Modals;
using BookstoreAPI.Domain.Entities;
using FluentValidation;
using MediatR;

namespace BookstoreAPI.Application.CQRS.Commands.EditBook
{
    public class EditBookHandler : IRequestHandler<EditBookCommand, Book>
    {
        private readonly IBookContext _db;

        public EditBookHandler(IBookContext db)
        {
            _db = db;
        }

        public async Task<Book> Handle(EditBookCommand request, CancellationToken cancellationToken)
        {
            var existingBook = await _db.Book.FindAsync(request.book.Id);
            if (existingBook == null)
            {
                throw new KeyNotFoundException($"Book with ID {request.book.Id} not found.");
            }
            existingBook = request.book;
            existingBook.LastUpdate = DateTime.Now;

            await _db.SaveChangesAsync(cancellationToken);

            return existingBook;
        }
    }
}
