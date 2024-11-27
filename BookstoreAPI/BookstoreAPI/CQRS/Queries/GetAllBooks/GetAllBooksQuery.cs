using BookstoreAPI.Modals;
using MediatR;

namespace BookstoreAPI.CQRS.Queries.GetAllBooks
{
    public record GetAllBooksQuery(int PageSize, int PageNumber) : IRequest<PaginatedBooksDTO>;

}
