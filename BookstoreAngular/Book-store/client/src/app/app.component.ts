import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bookstore';
  spinner = true
  loader () {
    this.spinner = false
  }

  fadeOut() {
    this.spinner = true
    setTimeout(() => {this.loader()}, 800);
  }

}

