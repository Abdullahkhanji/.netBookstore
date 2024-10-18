import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css'],
})
export class PagesLoginComponent implements OnInit {
  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {}
  login(email: string, password: string) {
    const auth = getAuth();
    let db = getFirestore();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        this.toastr.success('logged in successfuly');
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        if (errorCode == 'auth/user-not-found') {
          this.toastr.warning('this email is not exist!');
        } else if (errorCode == 'auth/wrong-password') {
          this.toastr.warning('the password is wrong');
        }
      });
  }
}
