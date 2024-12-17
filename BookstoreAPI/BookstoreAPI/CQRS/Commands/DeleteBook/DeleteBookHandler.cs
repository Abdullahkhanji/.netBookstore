using BookstoreAPI.CQRS.Commands.InsertBook;
using BookstoreAPI.Modals;
using MediatR;

namespace BookstoreAPI.CQRS.Commands.DeleteBook
{
    public class DeleteBookHandler : IRequestHandler<DeleteBookCommand, Book>
    {
        private BookContext _db;
        public DeleteBookHandler(BookContext db)
        {
            _db = db;
        }

        public async Task<Book> Handle(DeleteBookCommand request, CancellationToken cancellationToken)
        {
            var bookToRemove = await _db.Book.FindAsync(request.Id);
            if (bookToRemove == null)
            {
                throw new KeyNotFoundException($"Book with ID {request.Id} not found.");
            }
            bookToRemove.LastUpdate = DateTime.Now;
            bookToRemove.IsDeleted = true;
            //_db.Book.Remove(bookToRemove);
            _db.SaveChanges();
            return await Task.FromResult(bookToRemove); ;
        }
    }
}
