import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Book } from './book.model';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}
  List: Book[] = [];
  url = environment.apiBaseURL + 'api/Book'
  getAllBooks = () => {
    return this.http.get<Book[]>(this.url).pipe(
      map((res: Book[]) => {
        return res;
      }),
      catchError((err) => {
        console.error(err);
        throw err; // rethrow the error for the caller to handle if needed
      })
    );
  };
  addBook = (book: any) => {
    this.http.post(environment.apiBaseURL + 'api/Book', book).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };
  deleteBook(id: number){
    this.http.delete(this.url + `/${id}`).subscribe({
      next: (res) => {
        console.log(res);
        location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
}
