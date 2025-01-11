using AutoMapper;
using BookstoreAPI.Application.Modals;
using BookstoreAPI.Domain.Entities;

namespace BookstoreAPI.Application.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Book, BookDTO>();
            CreateMap<PaginatedBooksDTO, List<Book>>();
        }
    }
}
