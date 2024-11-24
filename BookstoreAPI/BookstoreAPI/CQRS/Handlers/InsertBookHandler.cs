using BookstoreAPI.CQRS.Commands;
using BookstoreAPI.Modals;
using MediatR;

namespace BookstoreAPI.CQRS.Handlers
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
            await _db.Books.AddAsync(request.book);
            _db.SaveChanges();
            return await Task.FromResult(request.book);
        }
    }
}
