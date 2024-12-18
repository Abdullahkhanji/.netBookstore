import { Book } from './book.model';

export class paginatedBook {
  booksList: Book[] = [];
  TotalCount: number = 0;
  PageNumber: number = 0;
  PageSize: number = 0;
}
