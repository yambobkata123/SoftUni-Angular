import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { IUser } from '../shared/interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  
  constructor(private http: HttpClient) {}

  register(user: IUser) {
    return this.http.post<IUser>(`/register`, user);
  }

  
}
