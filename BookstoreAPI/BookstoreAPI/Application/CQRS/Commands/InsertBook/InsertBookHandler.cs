using BookstoreAPI.Application.Interfaces;
using BookstoreAPI.Application.Validators;
using BookstoreAPI.Domain.Entities;
using FluentValidation;
using MediatR;

namespace BookstoreAPI.Application.CQRS.Commands.InsertBook
{
    public class InsertBookHandler : IRequestHandler<InsertBookCommand, Book>
    {
        private IBookContext _db;
        public InsertBookHandler(IBookContext db)
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
            await _db.SaveChangesAsync(cancellationToken);
            return await Task.FromResult(request.book);
        }
    }
}
