using BookstoreAPI.CQRS.Queries;
using BookstoreAPI.Modals;
using MediatR;

namespace BookstoreAPI.CQRS.Handlers
{
    public class GetAllBooksHandler : IRequestHandler<GetAllBooksQuery, List<Book>>
    {
        BookContext _db;

        public GetAllBooksHandler(BookContext db)
        {
            _db = db;
        }
        public async Task<List<Book>> Handle(GetAllBooksQuery request, CancellationToken cancellationToken)
        {
            return await Task.FromResult(_db.Books.ToList());
        }
    }
}
