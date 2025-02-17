using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using FluentAssertions;
using BookstoreAPI;
using BookstoreAPI.Domain.Entities;
using BookstoreAPI.Infrastructure; // Adjust this based on your actual namespace

namespace BookstoreAPI.IntegrationTests
{
    public class BookstoreApiTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public BookstoreApiTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    // Remove the existing database configuration
                    var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<BookContext>));
                    if (descriptor != null)
                    {
                        services.Remove(descriptor);
                    }

                    // Add an in-memory database for testing
                    services.AddDbContext<BookContext>(options =>
                        options.UseInMemoryDatabase("TestDb"));

                    // Build the service provider
                    var sp = services.BuildServiceProvider();

                    // Create a scope to get the database context
                    using (var scope = sp.CreateScope())
                    {
                        var scopedServices = scope.ServiceProvider;
                        var db = scopedServices.GetRequiredService<BookContext>();

                        // Ensure the database is created
                        db.Database.EnsureCreated();

                        // Optionally seed test data
                        db.Book.Add(new Book { Title = "Test Book 1", Author = "Author 1" });
                        db.Book.Add(new Book { Title = "Test Book 2", Author = "Author 2" });
                        db.SaveChanges();
                    }
                });
            }).CreateClient();
        }

        [Fact]
        public async Task GetBooks_ReturnsSuccessAndCorrectContentType()
        {
            var response = await _client.GetAsync("/api/Book");
            var responseBody = await response.Content.ReadAsStringAsync();

            // Print response for debugging
            Console.WriteLine($"Response: {response.StatusCode}");
            Console.WriteLine($"Body: {responseBody}");

            response.EnsureSuccessStatusCode();
            response.Content.Headers.ContentType.ToString().Should().Contain("application/json");
        }

        [Fact]
        public async Task PostBook_ReturnsCreated()
        {
            var book = new { Title = "Test Book", Author = "Author Name" };
            var content = new StringContent(JsonSerializer.Serialize(book), Encoding.UTF8, "application/json");

            var response = await _client.PostAsync("/api/Book", content);
            response.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);
        }
    }
}
