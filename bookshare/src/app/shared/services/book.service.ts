import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IBook } from '../interfaces/book';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/books`;

  list(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.baseUrl);
  }

  get(id: string): Observable<IBook> {
    return this.http.get<IBook>(`${this.baseUrl}/${id}`);
  }

  create(payload: Omit<IBook, 'id' | 'likes'> & { likes?: string[] }): Observable<IBook> {
    return this.http.post<IBook>(this.baseUrl, payload);
  }

  update(id: string, payload: Partial<IBook>): Observable<IBook> {
    return this.http.put<IBook>(`${this.baseUrl}/${id}`, payload);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  toggleLike(id: string, userId: string): Observable<IBook> {
    return this.http.post<IBook>(`${this.baseUrl}/${id}/like`, { userId });
  }
}

