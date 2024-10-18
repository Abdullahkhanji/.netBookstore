import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  auth = getAuth();
  data: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }
  sidebarToggle() {
    this.document.body.classList.toggle('toggle-sidebar');
  }
  async getUserData() {
    const user = this.auth.currentUser;
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        let db = getFirestore();
        let docRef = doc(db, 'users', user.uid);
        let docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.data = docSnap.data();
          console.log('sdgsg', this.data);
        }
      } else {
        console.log('No such user!');
      }
    });
    // if(user){
    //   let db = getFirestore();
    //   let docRef = doc(db, 'users', user.uid);
    //   let docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     this.data = docSnap.data();;
    //     console.log('sdgsg',this.data)
    //   } else {
    //     console.log('No such user!');
    //   }
    // }
  }
  logout() {
    signOut(this.auth);
    this.router.navigate(['/pages-login']);
  }
}
