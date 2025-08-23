
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isLogged: CanActivateFn = () => {
  const router = inject(Router);

  if(localStorage.getItem('user')) {

    return true;
  }
  return router.navigate(['/login']);
};

export const isLoggedNot: CanActivateFn = () => {
  const router = inject(Router);

  if(localStorage.getItem('user')) {
    return router.navigate(['/home']);

  }
  return true;
};
