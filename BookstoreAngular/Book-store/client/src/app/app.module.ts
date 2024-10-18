import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SwiperModule } from 'swiper/angular';
import { FooterComponent } from './footer/footer.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BookPageComponent } from './book-page/book-page.component';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';
import { AllBooksComponent } from './all-books/all-books.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { AddBookComponent } from './add-book/add-book.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { RegisterComponent } from './register/register.component';
import { FileSaverModule } from 'ngx-filesaver';
import { getFunctions } from 'firebase/functions';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';

const firebaseConfig = {
  apiKey: 'AIzaSyAaopGUrvPb3W8WiXhnq-PLZl8A65waJIc',
  authDomain: 'book-store-34554.firebaseapp.com',
  databaseURL: 'https://book-store-34554-default-rtdb.firebaseio.com',
  projectId: 'book-store-34554',
  storageBucket: 'book-store-34554.appspot.com',
  messagingSenderId: '623922298590',
  appId: '1:623922298590:web:f5ae843651df5998704c4f',
  measurementId: 'G-RQWLRZS8XL',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const functions = getFunctions(app);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginPageComponent,
    BookPageComponent,
    FavoritePageComponent,
    AllBooksComponent,
    AddBookComponent,
    ProfilePageComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    BrowserAnimationsModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDocViewerModule,
    FileSaverModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
