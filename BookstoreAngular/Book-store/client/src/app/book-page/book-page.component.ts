import { getAuth } from 'firebase/auth';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getFirestore,
  increment,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileSaverOptions } from 'file-saver';
import { FileSaverDirective, FileSaverService } from 'ngx-filesaver';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
})
export class BookPageComponent implements OnInit {
  data: any;
  id: any;
  view_book = false;
  view_fav = false;
  options: FileSaverOptions = {
    autoBom: false,
  };

  constructor(private _Activatedroute: ActivatedRoute, private toastr: ToastrService) {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getBookData();
    this.favoriteIcon();
  }

  async getBookData() {
    const storage = getStorage();
    let db = getFirestore();
    let docRef = doc(db, 'books', this.id);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let index: any = docSnap.data();
      const fileRef = ref(storage, docSnap.data()['bookPDF']);
      const storageRef = ref(storage, docSnap.data()['bookCover']);

      getDownloadURL(fileRef).then((url: any) => {
        index.selectedFile = url;
        console.log(url);
      });
      getDownloadURL(storageRef).then((url: any) => {
        index.selectedImage = url;

      });
      this.data = index;
    } else {
      console.log('No such document!');
    }
  }

  async addToFavorite() {
    console.log(this.data);
    let db = getFirestore();
    let auth = getAuth();
    let user = auth.currentUser;
    if (user) {
      let docRef = doc(db, 'users', user.uid);
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.view_fav = true;
        console.log(this.data.id);
        let favoriteList: [] = docSnap.data()['favoriteList'];
        await updateDoc(doc(db, 'users', user.uid), {
          favoriteList: [...favoriteList, this.data.id],
        });
        this.toastr.success('the book added to favorites successfuly');

      }
    } else {
      console.log('no user');
    }
  }

  async removeFromFavorite() {
    console.log(this.data);
    let db = getFirestore();
    let auth = getAuth();
    let user = auth.currentUser;
    if (user) {
      let docRef = doc(db, 'users', user.uid);
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(this.data.id);
        this.view_fav = false;
        let favoriteList: [] = docSnap
          .data()
          ['favoriteList'].filter((id: any) => id != this.data.id);
        await updateDoc(doc(db, 'users', user.uid), {
          favoriteList: [...favoriteList],
        });
        this.toastr.success('the book removed from favorites successfuly');
      }
    } else {
      console.log('no user');
    }
  }

  async favoriteIcon() {
    console.log(this.data);
    let db = getFirestore();
    let auth = getAuth();
    let user = auth.currentUser;
    if (user) {
      let docRef = doc(db, 'users', user.uid);
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(this.data.id);
        if (docSnap.data()['favoriteList'].includes(this.data.id)) {
          this.view_fav = true;
        }
      } else {
        this.view_fav = false;
      }
    } else {
      console.log('no user');
    }
  }

  async viewBook() {
    let db = getFirestore();
    let docRef = doc(db, 'books', this.data.id);
    await updateDoc(docRef, {
      view_no: increment(1),
    });
    this.view_book = true;
  }
  hideBook() {
    this.view_book = false;
  }

  async onDown(fileurl: any) {
    let db = getFirestore();
    // Document reference
    let docRef = doc(db, 'books', this.data.id);
    await updateDoc(docRef, {
      download_no: increment(1),
    });
    window.open(fileurl.selectedFile, '_blank');
  }

}
