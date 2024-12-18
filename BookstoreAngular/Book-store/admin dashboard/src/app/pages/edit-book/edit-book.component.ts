import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getAuth } from 'firebase/auth';
import {
  doc,
  getFirestore,
  setDoc,
  collection,
  updateDoc,
  addDoc,
  getDoc,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { Book } from 'src/app/shared/book.model';
import { BookService } from 'src/app/shared/book.service';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  storage = getStorage();
  imageURL: any;
  fileURL: any;
  selectedImage: any;
  selectedFile: any;
  id: any;
  data: Book = {
    title: '',
    author: '',
    publisher: '',
    publicationDate: '',
    pageCount: 0,
    description: '',
    cover: '',
    pdfFile: '',
    uid: 0,
    downloadCount: 0,
    viewCount: 0,
  };

  constructor(
    private formBuilder: FormBuilder,
    private _Activatedroute: ActivatedRoute,
    public service: BookService
  ) {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getBookData();

    // console.log(this.id);
  }

  // onChangeImage(event: any) {
  //   this.selectedImage = event.target.files[0];
  // }
  // onChangeFile(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }
  async getBookData() {
    this.service.getBookInfo(this.id).subscribe({
      next: (book: Book) => {
        this.data = book;
        console.log(this.data);
        this.setFormValue();
      },
      error: (err: any) => {
        console.error('Error fetching books', err);
      },
    });
  }

  editBookForm = this.formBuilder.group({
    name: this.data.title,
    author: this.data.author,
    publisher: this.data.publisher,
    publicationDate: this.data.publicationDate,
    pageCount: this.data.pageCount,
    description: this.data.description,
  });
  setFormValue() {
    this.editBookForm.patchValue({
      name: this.data.title,
      author: this.data.author,
      publisher: this.data.publisher,
      publicationDate: this.data.publicationDate,
      pageCount: this.data.pageCount,
      description: this.data.description,
    });
  }
  async editBook() {
    this.service.editBook(this.id, {
      id: this.data.id,
      title: this.editBookForm.value.name,
      author: this.editBookForm.value.author,
      publisher: this.editBookForm.value.publisher,
      publicationDate: this.editBookForm.value.publicationDate,
      pageCount: this.editBookForm.value.pageCount,
      description: this.editBookForm.value.description,
      cover: 'this.data.cover',
      pdfFile: 'this.data.pdfFile',
      uid: this.data.uid,
      downloadCount: this.data.downloadCount,
      viewCount: this.data.viewCount,
    });
  }
}
