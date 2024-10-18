import { Component, OnInit } from '@angular/core';
import {
  doc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  orderBy,
  onSnapshot,
  query,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css'],
})
export class AllBooksComponent implements OnInit {
  booksList: any = [];
  searchedText: any
  filteredList: any = this.booksList

  db = getFirestore();
  colRef = collection(this.db, 'books');

  constructor() {}

  ngOnInit(): void {
    this.readBooks();
    console.log(this.booksList);
  }

  async readBooks() {
    let snapshot = await getDocs(collection(this.db, 'books'));
    snapshot.forEach((doc) => {
      let index: any = doc.data();
      index.id = doc.id;
      const storage = getStorage();
      const storageRef = ref(storage, `${doc.data()['bookCover']}`);
      const fileRef = ref(storage, `${doc.data()['bookPDF']}`);

      getDownloadURL(storageRef).then((url) => {
        index.selectedImage = url;
      });
      getDownloadURL(fileRef).then((url: any) => {
        index.selectedFile = url;
      });
      this.booksList.push(index);
    });
  }
  onSearch(searchedText: any){
    this.filteredList = []
    this.booksList.forEach((book: any) => {
      if(book.name.toLowerCase().includes(searchedText)){
        this.filteredList.push(book)
      }
      
    });
    console.log(this.booksList)
    console.log(this.filteredList)
    console.log(searchedText)
  }
  async onChange(sort: any) {
    if (sort !== 'none') {
      this.filteredList = []
      let q = query(this.colRef, orderBy(sort, 'desc'));
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          let index: any = doc.data();
          index.id = doc.id;
          const storage = getStorage();
          const storageRef = ref(storage, `${doc.data()['bookCover']}`);
          const fileRef = ref(storage, `${doc.data()['bookPDF']}`);

          getDownloadURL(storageRef).then((url) => {
            index.selectedImage = url;
          });
          getDownloadURL(fileRef).then((url: any) => {
            index.selectedFile = url;
          });
          this.filteredList.push(index);
        });
        console.log(this.filteredList);
      });
    } else {
      this.filteredList = []
      let snapshot = await getDocs(collection(this.db, 'books'));
      snapshot.forEach((doc) => {
        let index: any = doc.data();
        index.id = doc.id;
        const storage = getStorage();
        const storageRef = ref(storage, `${doc.data()['bookCover']}`);
        const fileRef = ref(storage, `${doc.data()['bookPDF']}`);
  
        getDownloadURL(storageRef).then((url) => {
          index.selectedImage = url;
        });
        getDownloadURL(fileRef).then((url: any) => {
          index.selectedFile = url;
        });
        this.filteredList.push(index);
      });
    }
    console.log(this.filteredList)
  }
  async onDown(fileurl: any, id: any) {
    let db = getFirestore();
    // Document reference
    let docRef = doc(db, 'books', id);
    await updateDoc(docRef, {
      download_no: increment(1),
    });
    window.open(fileurl, '_blank');
  }
}
