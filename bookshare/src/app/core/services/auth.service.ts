
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../../shared/interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })


export class AuthService {
  public user$$ = new BehaviorSubject<IUser | null>(null);
  public user$ = this.user$$.asObservable();

  constructor(private router: Router,private http: HttpClient) { }
  register( email:string, password:string){
      return this.http.post('/api/register', { email, password });
    }
    login(email:string,password: string) {
      return this.http.post<IUser>(`/api/login`, {email, password});
    }
    
}

