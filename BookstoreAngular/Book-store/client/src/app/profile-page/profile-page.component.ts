import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  data: any;
  selectedImage: any = '';
  previosImage: string = '';
  auth = getAuth();
  user = this.auth.currentUser;
  db = getFirestore();
  storage = getStorage();
  booksList: any = [];
  favoriteList: any = [];

  constructor(public formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.getUser();
    this.getBooks();
  }

  loadFile(event: any) {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);
  }

  profileForm = this.formBuilder.group({
    firstName: '',
    surname: '',
    phoneNumber: '',
    birthDate: '',
    address: '',
    country: '',
    State: '',
  });
  setFormValue() {
    this.profileForm.setValue({
      firstName: this.data.firstName,
      surname: this.data.surname,
      phoneNumber: this.data.phoneNumber,
      birthDate: this.data.birthDate,
      address: this.data.address,
      country: this.data.country,
      State: this.data.State,
    });
  }
  async saveProfile() {
    if (this.selectedImage) {
      const storageRef = ref(
        this.storage,
        `profile/${this.selectedImage.name}`
      );
      uploadBytes(storageRef, this.selectedImage);
      onAuthStateChanged(this.auth, async (user) => {
        console.log(user);
        if (user) {
          await updateDoc(doc(this.db, 'users', user.uid), {
            firstName: this.profileForm.value.firstName,
            surname: this.profileForm.value.surname,
            phoneNumber: this.profileForm.value.phoneNumber,
            birthDate: this.profileForm.value.birthDate,
            address: this.profileForm.value.address,
            country: this.profileForm.value.country,
            State: this.profileForm.value.State,
            profilePic: storageRef.fullPath,
          });
        } else {
          console.log('no user');
        }
      });
    } else if (!this.selectedImage) {
      console.log(this.previosImage);
      onAuthStateChanged(this.auth, async (user) => {
        console.log(user);
        if (user) {
          await updateDoc(doc(this.db, 'users', user.uid), {
            firstName: this.profileForm.value.firstName,
            surname: this.profileForm.value.surname,
            phoneNumber: this.profileForm.value.phoneNumber,
            birthDate: this.profileForm.value.birthDate,
            address: this.profileForm.value.address,
            country: this.profileForm.value.country,
            State: this.profileForm.value.State,
            profilePic: this.previosImage,
          });
        } else {
          console.log('no user');
        }
      });
    }
    this.router.navigate([`/profile`]);
  }
  getUser() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const uid = user.uid;
        let docRef = doc(this.db, 'users', uid);
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let index: any = docSnap.data();
          this.previosImage = index.profilePic;
          const storageRef = ref(this.storage, index.profilePic);
          getDownloadURL(storageRef).then((url: any) => {
            index.profilePic = url;
          });
          this.data = index;
          this.setFormValue();
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('user is null');
      }
    });
  }
  async getBooks() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let snapshot = await getDocs(collection(this.db, 'books'));
        snapshot.forEach((doc) => {
          let index: any = doc.data();
          index.id = doc.id;
          const storageRef = ref(this.storage, `${doc.data()['bookCover']}`);
          const fileRef = ref(this.storage, `${doc.data()['bookPDF']}`);

          getDownloadURL(storageRef).then((url) => {
            index.selectedImage = url;
          });
          getDownloadURL(fileRef).then((url: any) => {
            index.selectedFile = url;
          });
          this.booksList.push(index);
        });
        this.favoriteList = this.booksList.filter(
          (book: any) => book.uid == user.uid
        );
        console.log(this.favoriteList);
      }
    });
  }
}
