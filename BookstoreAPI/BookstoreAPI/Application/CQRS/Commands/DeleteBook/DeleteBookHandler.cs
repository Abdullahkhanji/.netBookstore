using BookstoreAPI.Application.Exceptions;
using BookstoreAPI.Application.Interfaces;
using BookstoreAPI.Domain.Entities;
using MediatR;

namespace BookstoreAPI.Application.CQRS.Commands.DeleteBook
{
    public class DeleteBookHandler : IRequestHandler<DeleteBookCommand, Book>
    {
        private IBookContext _db;
        public DeleteBookHandler(IBookContext db)
        {
            _db = db;
        }

        public async Task<Book> Handle(DeleteBookCommand request, CancellationToken cancellationToken)
        {
            var bookToRemove = await _db.Book.FindAsync(request.Id);
            if (bookToRemove == null)
            {
                throw new BookNotFoundException(request.Id.ToString());
            }
            bookToRemove.LastUpdate = DateTime.Now;
            bookToRemove.IsDeleted = true;
            //_db.Book.Remove(bookToRemove);
            await _db.SaveChangesAsync(cancellationToken);
            return await Task.FromResult(bookToRemove); ;
        }
    }
}
