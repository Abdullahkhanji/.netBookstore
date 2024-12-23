using FluentValidation;

namespace BookstoreAPI.Modals
{
    public class BookValidator : AbstractValidator<Book>
    {
        public BookValidator()
        {

            RuleFor(product => product.Title)
                .NotEmpty().WithMessage("Title is required.")
                .Length(3, 100).WithMessage("Title must be between 3 and 100 characters.");

        }
    }
}
