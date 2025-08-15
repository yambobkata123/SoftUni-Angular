
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class LoginComponent {
  form: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    if (this.form.valid) {
      this.isLoading = true;
      try {
    const { email, password } = this.form.value;
        await this.authService.login(email, password);
        this.router.navigate(['/catalog']);
      } catch (error: any) {
        console.error('Login error:', error);
        alert(error.message || 'Login failed. Please try again.');
      } finally {
        this.isLoading = false;
      }
    }
  }
}
