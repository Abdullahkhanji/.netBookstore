using AutoMapper;
using BookstoreAPI.Modals;

namespace BookstoreAPI.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile() {
            CreateMap<Book, BookDTO>();
            CreateMap<PaginatedBooksDTO, List<Book>>();
        }
    }
}
