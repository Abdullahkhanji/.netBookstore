import { BookService } from './../shared/book.service';
import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { ToastrService } from 'ngx-toastr';
import SwiperCore, { Pagination, Navigation } from 'swiper';

SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  latestBooks: any = [];
  mostDownloaded: any = [];

  constructor(private toastr: ToastrService, public service: BookService) {}

  ngOnInit(): void {
    this.service.getAllBooks();
    this.onState();
    this.readMostDownloaded();
    this.readLatest();
    const auth = getAuth();
    const user = auth.currentUser;
  }

  async readMostDownloaded() {
    let db = getFirestore();
    let colRef = collection(db, 'books');
    let q = query(colRef, orderBy('download_no', 'desc'), limit(10));
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
        this.mostDownloaded.push(index);
      });
    });
  }
  async readLatest() {
    let db = getFirestore();
    let colRef = collection(db, 'books');
    let q = query(colRef, orderBy('uploud_Date', 'asc'), limit(10));
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
        this.latestBooks.push(index);
      });
    });
  }
  onState() {
    let auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
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
  async addToFavorite(id: string) {
    let db = getFirestore();
    let auth = getAuth();
    let user = auth.currentUser;
    if (user) {
      let docRef = doc(db, 'users', user.uid);
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let favoriteList: any[] = docSnap.data()['favoriteList'];
        if (!favoriteList.includes(id)) {
          await updateDoc(doc(db, 'users', user.uid), {
            favoriteList: [...favoriteList, id],
          });
          this.toastr.success('the book added to favorites successfuly');
        }
      }
    } else {
      console.log('no user');
    }
  }
}
