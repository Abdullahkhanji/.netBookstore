using BookstoreAPI.Application.Modals;
using MediatR;

namespace BookstoreAPI.Application.CQRS.Queries.GetBookById
{
    public record GetBookByIdQuery(int Id) : IRequest<BookDTO>;
}
