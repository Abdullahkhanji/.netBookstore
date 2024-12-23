using BookstoreAPI.Modals;
using FluentValidation;
using MediatR;

namespace BookstoreAPI.CQRS.Commands.EditBook
{
    public class EditBookHandler : IRequestHandler<EditBookCommand, Book>
    {
        private readonly BookContext _db;

        public EditBookHandler(BookContext db)
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
            var validator = new BookValidator();
            var validationResult = validator.Validate(request.book);

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }
            _db.SaveChanges();

            return existingBook;
        }
    }
}
