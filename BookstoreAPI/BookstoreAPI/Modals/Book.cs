using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookstoreAPI.Modals
{
    public class Book
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Title { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Author { get; set; }

        [Column(TypeName = "nvarchar(500)")]
        public string Description { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Publisher { get; set; }

        [Column(TypeName = "nvarchar(10)")]
        public string PublicationDate { get; set; }

        [Column(TypeName = "int")]
        public int PageCount { get; set; }

        [Column(TypeName = "nvarchar(500)")]
        public string Cover { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string PDFFile { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public int UID { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string UploudDate { get; set; }

        [Column(TypeName = "int")]
        public int DownloadCount { get; set; }

        [Column(TypeName = "int")]
        public int ViewCount { get; set; }
    }
}
