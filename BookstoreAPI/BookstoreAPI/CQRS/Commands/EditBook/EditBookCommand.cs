using BookstoreAPI.Modals;
using MediatR;

namespace BookstoreAPI.CQRS.Commands.EditBook
{
    public record EditBookCommand(Book book) : IRequest<Book>;
}
