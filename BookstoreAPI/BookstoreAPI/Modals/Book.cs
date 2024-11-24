using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreAPI.Modals
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Publisher { get; set; }
        public string PublicationDate { get; set; }
        public int PageCount { get; set; }
        public string Cover { get; set; }
        public string PDFFile { get; set; }
        public int UID { get; set; }
        public string UploudDate { get; set; }
        public int DownloadCount { get; set; }
        public int ViewCount { get; set; }
    }
}
