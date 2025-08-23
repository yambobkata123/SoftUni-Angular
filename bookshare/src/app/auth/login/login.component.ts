
import { Component } from '@angular/core';
import {  FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ RouterLink,FormsModule]
})
export class LoginComponent {

  constructor(
    private router: Router,
    private userservice: AuthService,
  ) {}

  login(form: NgForm) {
    const {email,password}= form.value;
    this.userservice.login(email, password).subscribe((data)=>{
      localStorage.setItem('user', data._id);
      this.router.navigate(['/home']);
    })
    
    
  }
}
