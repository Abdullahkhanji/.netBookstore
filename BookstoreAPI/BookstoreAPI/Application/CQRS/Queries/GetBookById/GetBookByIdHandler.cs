using AutoMapper;
using AutoMapper.QueryableExtensions;
using BookstoreAPI.Application.Interfaces;
using BookstoreAPI.Application.Modals;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BookstoreAPI.Application.CQRS.Queries.GetBookById
{
    public class GetBookByIdHandler : IRequestHandler<GetBookByIdQuery, BookDTO>
    {
        private readonly IBookContext _db;
        private readonly IMapper _mapper;

        public GetBookByIdHandler(IMapper mapper, IBookContext db)
        {
            _mapper = mapper;
            _db = db;
        }

        public async Task<BookDTO> Handle(GetBookByIdQuery request, CancellationToken cancellationToken)
        {
            var bookDto = await _db.Book
                .Where(b => b.Id == request.Id && !b.IsDeleted)     // Filter by ID
                .ProjectTo<BookDTO>(_mapper.ConfigurationProvider)  // Map directly to BookDTO
                .FirstOrDefaultAsync(cancellationToken);            // Get the first or default

            return bookDto; // Return the mapped DTO
        }
    }

}
