import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { SearchComponent } from './search/search.component';
import { MyBooksComponent } from './my-books/my-books.component';

export const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent },
  { path: 'my-books', component: MyBooksComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]; 