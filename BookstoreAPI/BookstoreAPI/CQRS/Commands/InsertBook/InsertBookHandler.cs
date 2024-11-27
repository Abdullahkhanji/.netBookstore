using BookstoreAPI.Modals;
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
            await _db.Book.AddAsync(request.book);
            _db.SaveChanges();
            return await Task.FromResult(request.book);
        }
    }
}
