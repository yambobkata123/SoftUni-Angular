import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-component',
  standalone:true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'BookShare';

  get isLoggedIn() : boolean {
    return !!localStorage.getItem('user');
  }
  constructor(public authService: AuthService, private router: Router) {}
  logout() { 
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }
}
