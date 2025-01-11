using BookstoreAPI.Application.Modals;
using MediatR;

namespace BookstoreAPI.Application.CQRS.Queries.GetAllBooks
{
    public record GetAllBooksQuery(int PageSize, int PageNumber) : IRequest<PaginatedBooksDTO>;

}
