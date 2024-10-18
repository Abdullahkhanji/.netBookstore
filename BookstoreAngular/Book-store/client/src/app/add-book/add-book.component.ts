import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { doc, collection, getFirestore, setDoc, addDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  selectedImage: any = null;
  selectedFile: any = null;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }
  onChangeFile(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
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
    const auth = getAuth();
    const uid = auth.currentUser?.uid
    const storage = getStorage();
    const db = getFirestore();
    const storageRef = ref(storage, `book-cover/${this.selectedImage.name}`);
    const fileRef = ref(storage, `book-pdf/${this.selectedFile.name}`);
    console.log(this.addBookForm.value);

    uploadBytes(storageRef, this.selectedImage);
    uploadBytes(fileRef, this.selectedFile);

    await addDoc(collection(db, 'books'), {
      name: this.addBookForm.value.name,
      author: this.addBookForm.value.author,
      publisher: this.addBookForm.value.publisher,
      publicationDate: this.addBookForm.value.publicationDate,
      pageCount: this.addBookForm.value.pageCount,
      description: this.addBookForm.value.description,
      bookCover: storageRef.fullPath,
      bookPDF: fileRef.fullPath,
      id: '',
      uid: uid,
      uploud_Date: Date.now(),
      download_no: 0,
      view_no: 0,
    }).then(async (result) => {
      console.log(result.id)
      await updateDoc(doc(db, 'books', result.id), {
        id: result.id,
      });
      this.addBookForm.reset();
    });
  }

}
