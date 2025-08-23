import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IBook } from '../shared/interfaces/book';
import { AuthService } from '../core/services/auth.service';
import { RouterModule } from '@angular/router';
import { BookService } from '../shared/services/book.service';

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
  currentUser: any;

  constructor(private authService: AuthService, private bookService: BookService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(u => {
      this.currentUser = u;
      this.refreshBooks();
    });
  }

  private refreshBooks(): void {
    if (!this.currentUser) { this.books = []; return; }
    this.bookService.list().subscribe(all => {
      this.books = all.filter(b => b.creatorId === this.currentUser.uid);
    });
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
    const payload: Partial<IBook> = {
      title: this.editModel.title?.trim() || this.editingBook.title,
      author: this.editModel.author?.trim() || this.editingBook.author,
      description: this.editModel.description?.trim() || this.editingBook.description,
      imageUrl: (this.editModel.imageUrl || '').toString() || this.editingBook.imageUrl
    };
    this.bookService.update(this.editingBook.id, payload).subscribe(updated => {
      this.books = this.books.map(b => b.id === updated.id ? updated : b);
      this.cancelEdit();
    });
  }

  deleteBook(book: IBook): void {
    if (!confirm(`Delete "${book.title}"?`)) return;
    this.bookService.remove(book.id).subscribe(() => {
      this.books = this.books.filter(b => b.id !== book.id);
    });
  }
} 