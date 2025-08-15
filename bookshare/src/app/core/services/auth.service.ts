
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  uid: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private router: Router) {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
  }
  }

  async login(email: string, password: string): Promise<void> {
    // Mock authentication - in real app, this would call Firebase
    if (email && password) {
      const user: User = {
        uid: 'mock-user-id',
        email: email
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.userSubject.next(user);
    } else {
      throw new Error('Invalid credentials');
  }
  }

  async register(email: string, password: string): Promise<void> {
    // Mock registration - in real app, this would call Firebase
    if (email && password) {
      const user: User = {
        uid: 'mock-user-id-' + Date.now(),
        email: email
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.userSubject.next(user);
    } else {
      throw new Error('Invalid registration data');
    }
  }

  logout(): Promise<void> {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
    return Promise.resolve();
  }
}
