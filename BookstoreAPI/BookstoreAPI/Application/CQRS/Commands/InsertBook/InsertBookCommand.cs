using BookstoreAPI.Domain.Entities;
using MediatR;

namespace BookstoreAPI.Application.CQRS.Commands.InsertBook
{
    public record InsertBookCommand(Book book) : IRequest<Book>;
}
