using BookstoreAPI.Application.Modals;
using BookstoreAPI.Domain.Entities;
using FluentValidation;

namespace BookstoreAPI.Application.Validators
{
    public class BookValidator : AbstractValidator<Book>
    {
        public BookValidator()
        {

            RuleFor(b => b.Title)
                .NotEmpty().WithMessage("Title is required.")
                .Length(3, 100).WithMessage("Title must be between 3 and 100 characters.");

        }
    }
}
