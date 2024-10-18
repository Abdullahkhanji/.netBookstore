import { Response } from './../../../../node_modules/@types/express-serve-static-core/ts4.0/index.d';
import { Component, OnInit, ElementRef } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { Book } from 'src/app/shared/book.model';
import { BookService } from 'src/app/shared/book.service';
@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css'],
})
export class AllBooksComponent implements OnInit {
  data: any;
  booksList: any = [];
  bookId: any;
  List: Book[] = [];

  constructor(private elementRef: ElementRef, public service: BookService) {}

  ngOnInit(): void {
    this.getBooks();
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/main.js';
    this.elementRef.nativeElement.appendChild(s);
  }

  getBooks() {
    this.service.getAllBooks().subscribe({
      next: (books: Book[]) => {
        books.forEach((book) => {
          let index: any = book;
          const storage = getStorage();
          const storageRef = ref(storage, book.cover);
          const fileRef = ref(storage, book.pdfFile);
          getDownloadURL(storageRef).then((url) => {
            console.log(url);
            index.selectedImage = url;
          });
          getDownloadURL(fileRef).then((url) => {
            index.selectedFile = url;
          });
          this.List.push(index);
          console.log(this.List)
        });
      },
      error: (err) => {
        console.error('Error fetching books', err);
      },
    });
  }

  // async readBooks() {
  //   let db = getFirestore();
  //   let snapshot = await getDocs(collection(db, 'books'));

  //   snapshot.forEach((doc) => {
  //     let index: any = doc.data();
  //     index.key = doc.id;
  //     this.booksList.push(index);
  //     const storage = getStorage();
  //     const storageRef = ref(storage, doc.data()['bookCover']);
  //     const fileRef = ref(storage, doc.data()['bookPDF']);
  //     getDownloadURL(fileRef).then((url: any) => {
  //       index.selectedFile = url;
  //     });
  //     getDownloadURL(storageRef).then((url) => {
  //       console.log(url);
  //       index.selectedImage = url;
  //     });
  //     getDownloadURL(fileRef).then((url) => {
  //       index.selectedFile = url;
  //     });
  //     this.data = index;
  //   });
  // }
  setId(id: any) {
    this.bookId = id;
  }
  async deleteBook(id: any) {
    // let db = getFirestore();
    // console.log(id);
    // await deleteDoc(doc(db, 'books', id));
    console.log(id)
    this.service.deleteBook(id)
  }
}
