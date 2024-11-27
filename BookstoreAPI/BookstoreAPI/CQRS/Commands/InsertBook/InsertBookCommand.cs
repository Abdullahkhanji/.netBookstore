using BookstoreAPI.Modals;
using MediatR;

namespace BookstoreAPI.CQRS.Commands.InsertBook
{
    public record InsertBookCommand(Book book) : IRequest<Book>;
}
