using BookstoreAPI.Modals;
using MediatR;

namespace BookstoreAPI.CQRS.Commands.DeleteBook
{
    public record DeleteBookCommand(int Id) : IRequest<Book>;
}
