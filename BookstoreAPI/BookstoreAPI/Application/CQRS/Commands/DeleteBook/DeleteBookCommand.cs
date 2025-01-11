using BookstoreAPI.Domain.Entities;
using MediatR;

namespace BookstoreAPI.Application.CQRS.Commands.DeleteBook
{
    public record DeleteBookCommand(int Id) : IRequest<Book>;
}
