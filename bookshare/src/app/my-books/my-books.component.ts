import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IBook } from '../shared/interfaces/book';
import { AuthService } from '../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {
  books: IBook[] = [];
  editingBook: IBook | null = null;
  editModel: Partial<IBook> = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.refreshBooks();
  }

  private getCurrentUser() {
    let currentUser: any = null;
    this.authService.user$.subscribe(u => currentUser = u).unsubscribe();
    return currentUser;
  }

  private readAllBooks(): IBook[] {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  }

  private writeAllBooks(all: IBook[]): void {
    localStorage.setItem('books', JSON.stringify(all));
  }

  private refreshBooks(): void {
    const allBooks = this.readAllBooks();
    const user = this.getCurrentUser();
    this.books = user ? allBooks.filter(b => b.creatorId === user.uid) : [];
  }

  openEdit(book: IBook): void {
    this.editingBook = book;
    this.editModel = {
      title: book.title,
      author: book.author,
      description: book.description,
      imageUrl: book.imageUrl
    };
  }

  cancelEdit(): void {
    this.editingBook = null;
    this.editModel = {};
  }

  saveEdit(): void {
    if (!this.editingBook) return;

    const all = this.readAllBooks();
    const idx = all.findIndex(b => b.id === this.editingBook!.id);
    if (idx !== -1) {
      all[idx] = {
        ...all[idx],
        title: this.editModel.title?.trim() || all[idx].title,
        author: this.editModel.author?.trim() || all[idx].author,
        description: this.editModel.description?.trim() || all[idx].description,
        imageUrl: (this.editModel.imageUrl || '').toString()
      };
      this.writeAllBooks(all);
      this.refreshBooks();
    }

    this.cancelEdit();
  }

  deleteBook(book: IBook): void {
    if (!confirm(`Delete "${book.title}"?`)) return;
    const all = this.readAllBooks();
    const filtered = all.filter(b => b.id !== book.id);
    this.writeAllBooks(filtered);
    this.refreshBooks();
  }
} 