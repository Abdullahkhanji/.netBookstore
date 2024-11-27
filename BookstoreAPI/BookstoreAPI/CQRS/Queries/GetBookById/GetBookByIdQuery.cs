using BookstoreAPI.Modals;
using MediatR;

namespace BookstoreAPI.CQRS.Queries.GetBookById
{
    public record GetBookByIdQuery(int Id) : IRequest<BookDTO>;
}
