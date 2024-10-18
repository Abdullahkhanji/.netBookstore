import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore, increment, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.css'],
})
export class FavoritePageComponent implements OnInit {


  imageName: string = '';
  storage = getStorage();
  data: any;
  favoriteList: any = [];

  constructor() {}

  ngOnInit(): void {
    this.getFavoritedBooks();
    console.log(this.favoriteList)
  }

  async getFavoritedBooks() {
    let db = getFirestore();
    let auth = getAuth()
    let user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      let docRef = doc(db, 'users', uid);
      let docSnap = await getDoc(docRef);
      let index: any = docSnap.data();
      let favoriteIdList: [] = index.favoriteList;
      console.log(favoriteIdList);
      favoriteIdList.forEach(async (id: any) => {
        let docRef = doc(db, 'books', id);
        let docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          console.log("book is exist")
          let data: any = docSnap.data()
          const storage = getStorage();
          const storageRef = ref(storage, `${docSnap.data()['bookCover']}`);
          const fileRef = ref(storage, `${docSnap.data()['bookPDF']}`);

          getDownloadURL(storageRef).then((url) => {
            data.coverUrl = url;
          });
          getDownloadURL(fileRef).then((url: any) => {
            index.fileUrl = url;
          });
          this.favoriteList.push(data)

        } else {
          console.log("book is not exist")
        }
      });
    } else {
      console.log('user is null');
    }
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
