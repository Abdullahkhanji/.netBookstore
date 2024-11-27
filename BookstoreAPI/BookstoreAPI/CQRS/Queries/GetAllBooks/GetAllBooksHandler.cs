using AutoMapper;
using BookstoreAPI.Modals;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookstoreAPI.CQRS.Queries.GetAllBooks
{
    public class GetAllBooksHandler : IRequestHandler<GetAllBooksQuery, PaginatedBooksDTO>
    {
        BookContext _db;
        private readonly IMapper _mapper;


        public GetAllBooksHandler(IMapper mapper, BookContext db)
        {
            _mapper = mapper;
            _db = db;
        }
        public async Task<PaginatedBooksDTO> Handle(GetAllBooksQuery request, CancellationToken cancellationToken)
        {
            var query = _db.Book.AsQueryable(); // Start with all books

            // Apply pagination (Skip and Take)
            var booksQuery = query.Skip((request.PageNumber - 1) * request.PageSize)  // Skip previous pages
                                  .Take(request.PageSize);  // Take current page size

            // Get the total count of books
            var totalCount = await query.CountAsync(cancellationToken);

            // Get the books for the current page
            var books = await booksQuery.ToListAsync(cancellationToken);

            // Map books to BookDTO
            var bookDtos = _mapper.Map<List<Book>>(books);

            // Return paginated result
            return new PaginatedBooksDTO
            {
                Books = bookDtos,
                TotalCount = totalCount,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize
            };
        }
    }
}
