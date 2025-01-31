﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using BookstoreAPI.Domain.Entities;
using BookstoreAPI.Infrastructure;
using BookstoreAPI.Application.CQRS.Queries.GetAllBooks;
using BookstoreAPI.Application.CQRS.Queries.GetBookById;
using BookstoreAPI.Application.CQRS.Commands.InsertBook;
using BookstoreAPI.Application.CQRS.Commands.DeleteBook;
using BookstoreAPI.Application.CQRS.Commands.EditBook;

namespace BookstoreAPI.WebUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookContext _context;
        private readonly IMediator _mediator;

        public BookController(BookContext context, IMediator mediator)
        {
            _context = context;
            _mediator = mediator;
        }


        // GET: api/Book
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks(int PageNumber, [FromQuery] int pageSize = 2)
        {

            var query = new GetAllBooksQuery(pageSize, PageNumber);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        // GET: api/Book/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {

            var result = await _mediator.Send(new GetBookByIdQuery(id));

            return Ok(result);
        }

        // POST: api/Book
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            var result = await _mediator.Send(new InsertBookCommand(book));

            return Ok(result);
        }

        // DELETE: api/Book/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var result = await _mediator.Send(new DeleteBookCommand(id));

            return Ok(result);
        }


        // PUT: api/Book/5

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(Book book)
        {
            var result = await _mediator.Send(new EditBookCommand(book));

            return Ok(result);
        }

    }
}
