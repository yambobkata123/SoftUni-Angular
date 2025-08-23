
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [RouterLink, FormsModule]
})
export class RegisterComponent {
  

  constructor(
    private authService: AuthService,
    private router: Router
  ) {};
  register(form: NgForm) {
    const { email, password } = form.value;
    this.authService.register( email, password ).subscribe((data)=>{
      

      return this.router.navigate(['/login']);
    });
    
  }

}
