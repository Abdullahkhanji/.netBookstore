import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false
  constructor() {}

  ngOnInit(): void {
    this.onState();
  }
  auth = getAuth();


  onState() {
    let auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    });
  }

  logout() {
    let auth = getAuth();
    signOut(auth)
    this.isLoggedIn = false
  }
}
