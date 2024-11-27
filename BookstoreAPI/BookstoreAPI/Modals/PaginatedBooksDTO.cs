namespace BookstoreAPI.Modals
{
    public class PaginatedBooksDTO
    {
        public List<Book> Books { get; set; }
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
    }
}
