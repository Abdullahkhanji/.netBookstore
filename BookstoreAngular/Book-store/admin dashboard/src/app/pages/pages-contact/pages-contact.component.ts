import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-pages-contact',
  templateUrl: './pages-contact.component.html',
  styleUrls: ['./pages-contact.component.css'],
})
export class PagesContactComponent implements OnInit {
  db = getFirestore();
  data: any;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getContactData();
  }
  contactData = this.formBuilder.group({
    phone: '',
    email: '',
    facebook: '',
    twitter: '',
    instagram: '',
    pinterest: '',
  });
  setFormValue() {
    this.contactData.setValue({
      phone: this.data.phone,
      email: this.data.email,
      facebook: this.data.facebook,
      twitter: this.data.twitter,
      instagram: this.data.instagram,
      pinterest: this.data.pinterest,
    });
  }
  async getContactData() {
    let docRef = doc(this.db, 'contact', 'contactdata');
    await getDoc(docRef).then((result) => {
      this.data = result.data();
    });
    this.setFormValue();

    console.log(this.data);
  }
  async addContactData() {
    await updateDoc(doc(this.db, 'contact', 'contactdata'), {
      phone: this.contactData.value.phone,
      email: this.contactData.value.email,
      facebook: this.contactData.value.facebook,
      twitter: this.contactData.value.twitter,
      instagram: this.contactData.value.instagram,
      pinterest: this.contactData.value.pinterest,
    });
  }
}
