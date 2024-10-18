import { getAuth } from 'firebase/auth';
import { Component, OnInit, ElementRef } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  data: any;
  usersList: any = [];
  userId: any

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.getUsers();

    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/main.js';
    this.elementRef.nativeElement.appendChild(s);
  }

  async getUsers() {
    let db = getFirestore();
    let snapshot = await getDocs(collection(db, 'users'));

    snapshot.forEach(async (doc) => {
      let index: any = doc.data();
      index.key = doc.id;
      this.usersList.push(index);
      const storage = getStorage();
      const storageRef = ref(storage, doc.data()['profilePic']);
      getDownloadURL(storageRef).then((url) => {
        console.log(url);
        index.profilePic = url;
      });
      console.log(doc);
      let db = getFirestore();
      let snapshot = query(collection(db, 'books'), where("uid", "==", index.uid));
      let uploudedBooks = await getDocs(snapshot)
      index.uploudedBooks = uploudedBooks.size
      this.data = index;
    });
  }

  async onChange(selectedRole: any, user: any) {
    let db = getFirestore();
    if (selectedRole === 'true') {
      await updateDoc(doc(db, 'users', user.uid), {
        admin: true,
      });
    } else if (selectedRole !== 'true') {
      await updateDoc(doc(db, 'users', user.uid), {
        admin: false,
      });
    }
  }
  setId(id: any){
    this.userId = id
    console.log(this.userId)
  }

  async removeUser(id: any) {
    let db = getFirestore();

    await deleteDoc(doc(db, 'users', id)).then(() => {
      this.usersList();
    });
    console.log('user is deleted');
    // User deleted.
  }
}
