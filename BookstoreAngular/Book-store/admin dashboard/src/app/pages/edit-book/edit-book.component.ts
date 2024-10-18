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
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  storage = getStorage();
  imageURL: any;
  fileURL: any
  selectedImage: any
  selectedFile: any
  id: any;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private _Activatedroute: ActivatedRoute
  ) {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getBookData();
    console.log(this.id);
  }

  onChangeImage(event: any) {
    this.selectedImage = event.target.files[0];
  }
  onChangeFile(event: any) {
    this.selectedFile = event.target.files[0];

  }
  async getBookData() {
    const storage = getStorage();
    let db = getFirestore();
    let docRef = doc(db, 'books', this.id);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.data = docSnap.data();
      console.log(this.data)
      this.setFormValue()
    } else {
      console.log('No such document!');
    }
  }

  editBookForm = this.formBuilder.group({
    name: '',
    author: '',
    publisher: '',
    publicationDate: '',
    pageCount: '',
    description: '',
    bookCover: '',
    bookPDF: '',
  });
  setFormValue() {
    this.editBookForm.setValue({
      name: this.data.name,
      author: this.data.author,
      publisher: this.data.publisher,
      publicationDate: this.data.publicationDate,
      pageCount: this.data.pageCount,
      description: this.data.description,
      bookCover: this.data.bookCover,
      bookPDF: this.data.bookPDF,
    });
  }
  async editBook() {
    let db = getFirestore();

    if (this.selectedImage) {
      const storageRef = ref(
        this.storage,
        `book-cover/${this.selectedImage.name}`
      );
      uploadBytes(storageRef, this.selectedImage);
      this.imageURL = storageRef.fullPath
    } else{
      this.imageURL = this.data.bookCover
    }
    if (this.selectedFile) {
      const storageRef = ref(
        this.storage,
        `book-pdf/${this.selectedFile.name}`
      );
      uploadBytes(storageRef, this.selectedFile);
      this.fileURL = storageRef.fullPath
    } else{
      this.fileURL = this.data.bookPDF
    }


    await updateDoc(doc(db, 'books', this.id), {
      name: this.editBookForm.value.name,
      author: this.editBookForm.value.author,
      publisher: this.editBookForm.value.publisher,
      publicationDate: this.editBookForm.value.publicationDate,
      pageCount: this.editBookForm.value.pageCount,
      description: this.editBookForm.value.description,
      bookCover: this.imageURL,
      bookPDF: this.fileURL,
    });
  }
}
