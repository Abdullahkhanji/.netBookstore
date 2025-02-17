namespace BookstoreAPI.Application.Exceptions
{
    public class BookNotFoundException : Exception
    {
        public BookNotFoundException(string message) : base(message)
        {
        }

        public BookNotFoundException(IEnumerable<string> errors)
            : base($"Validation failed: {string.Join("; ", errors)}")
        {
        }
    }
}
