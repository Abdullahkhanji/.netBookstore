
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { AllBooksComponent } from './pages/all-books/all-books.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { GuardAuthGuard } from './guard-auth/guard-auth.guard';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { ModalComponent } from './components/modal/modal.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  { path: 'dashboard',canActivate:[GuardAuthGuard], component: DashboardComponent },
  { path: 'pages-contact',canActivate:[GuardAuthGuard], component: PagesContactComponent },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'add-book',canActivate:[GuardAuthGuard], component: AddBookComponent },
  { path: 'edit-book/:id',canActivate:[GuardAuthGuard], component: EditBookComponent },
  { path: 'all-books',canActivate:[GuardAuthGuard], component: AllBooksComponent },
  { path: 'users-list',canActivate:[GuardAuthGuard], component: AllUsersComponent },
  { path: 'model-list', component: ModalComponent },

  { path: 'error404', component: PagesError404Component },

  { 
    path: '**',
    redirectTo: 'error404',
    pathMatch: 'full', 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
