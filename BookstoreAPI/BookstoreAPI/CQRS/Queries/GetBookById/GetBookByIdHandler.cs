using AutoMapper;
using BookstoreAPI.CQRS.Queries.GetAllBooks;
using BookstoreAPI.Modals;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookstoreAPI.CQRS.Queries.GetBookById
{
    public class GetBookByIdHandler : IRequestHandler<GetBookByIdQuery, BookDTO>
    {
        private readonly BookContext _db;
        private readonly IMapper _mapper;

        public GetBookByIdHandler(IMapper mapper, BookContext db)
        {
            _mapper = mapper;
            _db = db;
        }
        public async Task<BookDTO> Handle(GetBookByIdQuery request, CancellationToken cancellationToken)
        {
            var book = await _db.Book.FirstOrDefaultAsync(b => b.Id == request.Id);
            return _mapper.Map<BookDTO>(book);
        }

    }
}
