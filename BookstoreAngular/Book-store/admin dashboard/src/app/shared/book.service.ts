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
  url = environment.apiBaseURL + 'api/Book';
  getAllBooks = () => {
    return this.http.get<Book[]>(this.url).pipe(
      map((res: Book[]) => {
        return res;
      }),
      catchError((err: any) => {
        console.error(err);
        throw err; // rethrow the error for the caller to handle if needed
      })
    );
  };
  addBook = (book: any) => {
    this.http.post(this.url, book).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  };
  deleteBook(id: number) {
    this.http.delete(this.url + `/${id}`).subscribe({
      next: (res: any) => {
        console.log(res);
        location.reload();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  getBookInfo(id: number) {
    return this.http.get<Book>(this.url + `/${id}`).pipe(
      map((res: Book) => {
        return res;
      }),
      catchError((err: any) => {
        console.error(err);
        throw err; // rethrow the error for the caller to handle if needed
      })
    );
  }
  editBook(id: number, book: any) {
    this.http.put(this.url + `/${id}`, book).subscribe({
      next: (res: any) => {
        console.log(res);
        location.reload();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  searchBooks = (title: string) => {
    return this.http.get<Book[]>(`${this.url}/search`, {
      params: { title }
    }).pipe(
      map((res: Book[]) => {
        return res;
      }),
      catchError((err: any) => {
        console.error(err);
        throw err; // Rethrow for the caller to handle
      })
    );
  };

}
