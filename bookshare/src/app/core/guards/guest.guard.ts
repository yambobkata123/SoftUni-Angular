
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate() {
    return this.afAuth.authState.pipe(
      map(user => {
        if (!user) return true;
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
