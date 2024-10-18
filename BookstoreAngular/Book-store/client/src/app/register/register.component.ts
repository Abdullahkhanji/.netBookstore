import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  register(email: string, password: string) {
    let functions = getFunctions();
    let auth = getAuth();
    let db = getFirestore();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: { user: any }) => {
        const userId = userCredential.user.uid;
        await setDoc(doc(db, 'users', userId), {
          email: email,
          firstName: '',
          surname: '',
          phoneNumber: '',
          birthDate: '',
          address: '',
          country: '',
          State: '',
          admin: false,
          favoriteList: [],
          profilePic: 'profile/defaultImage.jpg',
          uid: userId,
        });
        console.log(userId);
        this.router.navigate([`/home`]);
      })
      .catch((error: { code: any; message: any }) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode ,"=>" ,errorMessage )
      });
  }
}
