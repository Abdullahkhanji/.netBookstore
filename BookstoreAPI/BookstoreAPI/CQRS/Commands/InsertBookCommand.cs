using BookstoreAPI.Modals;
using MediatR;

namespace BookstoreAPI.CQRS.Commands
{
    public record InsertBookCommand(Book book) : IRequest<Book>;
}
