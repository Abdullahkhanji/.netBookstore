using BookstoreAPI.Domain.Entities;
using MediatR;

namespace BookstoreAPI.Application.CQRS.Commands.EditBook
{
    public record EditBookCommand(Book book) : IRequest<Book>;
}
