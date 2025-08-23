import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {  isLogged, isLoggedNot } from './core/guards/auth.guard';
import { SearchComponent } from './search/search.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { Notfound } from './notfound/notfound';
import { EditBook } from './edit-book/edit-book';
import { DetailsPage } from './details-page/details-page';

export const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'search', component: SearchComponent },
  { path: 'create-book', component: CreateBookComponent ,canActivate:[isLogged]},
  { path: 'my-books', component: MyBooksComponent,canActivate:[isLogged] },
  { path: 'details/:id', component: DetailsPage },
  { path: 'edit-book/:id', component: EditBook,canActivate:[isLogged]},
  { path: 'login', component: LoginComponent,canActivate:[isLoggedNot] },
  { path: 'register', component: RegisterComponent, canActivate: [isLoggedNot] },
  { path: '**', component: Notfound }
]; 