using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookstoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Book",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Author = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", nullable: false),
                    Publisher = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    PublicationDate = table.Column<string>(type: "nvarchar(10)", nullable: false),
                    PageCount = table.Column<int>(type: "int", nullable: false),
                    Cover = table.Column<string>(type: "nvarchar(500)", nullable: false),
                    PDFFile = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    UID = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    UploudDate = table.Column<string>(type: "nvarchar(10)", nullable: false),
                    DownloadCount = table.Column<int>(type: "int", nullable: false),
                    ViewCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Book", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Book");
        }
    }
}
