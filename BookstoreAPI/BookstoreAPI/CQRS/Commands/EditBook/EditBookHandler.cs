using BookstoreAPI.Modals;
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
            _db.SaveChanges();

            return existingBook;
        }
    }
}
