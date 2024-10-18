import { Component, OnInit } from '@angular/core';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

interface ContactData {
  phone: string,
  email: string,
  facebook: string,
  twitter: string,
  instagram: string,
  pinterest: string
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  db = getFirestore();
  data: ContactData | any;
  phone: string = '';
  email: string = '';
  facebook: string = '';
  twitter: string = '';
  instagram: string = '';
  pinterest: string = '';
  constructor() {}

  ngOnInit(): void {
    this.getContactData();
  }

  async getContactData(): Promise<void> {
    const docRef = doc(this.db, 'contact', 'contactdata');
    const result = await getDoc(docRef);
    if (result.exists()) {
      this.data = result.data() as ContactData; // Cast to ContactData
      this.phone = this.data.phone
      this.email = this.data.email
      this.facebook = this.data.facebook
      this.twitter = this.data.twitter
      this.instagram = this.data.instagram
      this.pinterest = this.data.pinterest
    } else {
      console.error('No such document!');
    }
  }
}
