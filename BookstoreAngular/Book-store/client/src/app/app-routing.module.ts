import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AllBooksComponent } from './all-books/all-books.component';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';
import { BookPageComponent } from './book-page/book-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'favoritePage', component: FavoritePageComponent },
  { path: 'allBooks', component: AllBooksComponent },
  { path: 'profile', component: ProfilePageComponent },

  
  { path: 'addBook', component: AddBookComponent },
  { path: 'bookView/:id', component: BookPageComponent },

  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
