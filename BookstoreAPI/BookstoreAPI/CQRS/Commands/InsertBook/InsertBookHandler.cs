using BookstoreAPI.Modals;
using FluentValidation;
using MediatR;

namespace BookstoreAPI.CQRS.Commands.InsertBook
{
    public class InsertBookHandler : IRequestHandler<InsertBookCommand, Book>
    {
        private BookContext _db;
        public InsertBookHandler(BookContext db)
        {
            _db = db;
        }
        public async Task<Book> Handle(InsertBookCommand request, CancellationToken cancellationToken)
        {
            request.book.LastUpdate = DateTime.Now;
            request.book.IsDeleted = false;
            var validator = new BookValidator();
            var validationResult = validator.Validate(request.book);

            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            await _db.Book.AddAsync(request.book);
            _db.SaveChanges();
            return await Task.FromResult(request.book);
        }
    }
}
