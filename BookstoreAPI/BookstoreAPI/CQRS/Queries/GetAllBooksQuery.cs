using BookstoreAPI.Modals;
using MediatR;

namespace BookstoreAPI.CQRS.Queries
{
    public record GetAllBooksQuery : IRequest<List<Book>>;
    
}
