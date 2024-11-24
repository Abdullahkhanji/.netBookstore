import {formatDate} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import {
  doc,
  getFirestore,
  setDoc,
  collection,
  updateDoc,
  addDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { BookService } from 'src/app/shared/book.service';

@Component({
  selector: 'add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  selectedImage: any = null;
  selectedFile: any = null;
  myDate = new Date();
  constructor(
    private formBuilder: FormBuilder,
    public service: BookService,
  ) {
   ;
  }

  ngOnInit(): void {}

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }
  onChangeFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addBookForm = this.formBuilder.group({
    name: '',
    author: '',
    publisher: '',
    publicationDate: '',
    pageCount: '',
    description: '',
    bookCover: '',
    bookPDF: '',
  });

  async addBook() {
    const storage = getStorage();
    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    // console.log(this.selectedImage), this.selectedFile
    // const storageRef = ref(storage, `book-cover/${this.selectedImage.name}`);
    // const fileRef = ref(storage, `book-pdf/${this.selectedFile.name}`);
    // uploadBytes(storageRef, this.selectedImage).then((snapshot) => {
    //   console.log('Uploaded a blob or file!');
    // });
    this.service.addBook({
      title: this.addBookForm.value.name,
      author: this.addBookForm.value.author,
      description: this.addBookForm.value.description,
      publisher: this.addBookForm.value.publisher,
      publicationDate: this.addBookForm.value.publicationDate,
      pageCount: this.addBookForm.value.pageCount,
      cover: "storageRef.fullPath",
      pdfFile: "fileRef.fullPath",
      uid: 0,
      uploudDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      downloadCount: 0,
      viewCount: 0,
    })
  }
  // async addBook() {
  //   const auth = getAuth();
  //   const uid = auth.currentUser?.uid;
  //   console.log(this.addBookForm.value);
  //   const storage = getStorage();
  //   const storageRef = ref(storage, `book-cover/${this.selectedImage.name}`);
  //   const fileRef = ref(storage, `book-pdf/${this.selectedFile.name}`);

  //   uploadBytes(storageRef, this.selectedImage).then((snapshot) => {
  //     console.log('Uploaded a blob or file!');
  //   });
  //   let db = getFirestore();

  //   await addDoc(collection(db, 'books'), {
  //     name: this.addBookForm.value.name,
  //     author: this.addBookForm.value.author,
  //     publisher: this.addBookForm.value.publisher,
  //     publicationDate: this.addBookForm.value.publicationDate,
  //     pageCount: this.addBookForm.value.pageCount,
  //     description: this.addBookForm.value.description,
  //     bookCover: storageRef.fullPath,
  //     bookPDF: fileRef.fullPath,
  //     id: '',
  //     uid: uid,
  //     uploud_Date: Date.now(),
  //     download_no: 0,
  //     view_no: 0,
  //   }).then(async (result) => {
  //     console.log(result.id);
  //     await updateDoc(doc(db, 'books', result.id), {
  //       id: result.id,
  //     });
  //     this.addBookForm.reset();
  //   });
  // }
}
