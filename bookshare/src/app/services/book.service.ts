import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from '../shared/interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {}

  createBook(book: IBook){
    return this.http.post<IBook>('/api/themes', book);
  }
  getAll(){
    return this.http.get<IBook[]>('/api/themes');
  }
  deleteBook(bookId: string){
    return this.http.post(`/api/themes/${bookId}/delete`,{bookId})
}
updateBook(bookId: string, book: IBook) {
  return this.http.put(`/api/themes/${bookId}/edit`, book, { withCredentials: true });
}}
