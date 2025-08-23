
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { IBook } from '../shared/interfaces/book';
import { RouterLink } from '@angular/router';
import { BookService } from '../shared/services/book.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink]
})
export class CatalogComponent implements OnInit {
  books: IBook[] = [];
  filteredBooks: IBook[] = [];
  searchTerm: string = '';
  showDetailsModal: boolean = false;
  selectedBook: IBook | null = null;
  currentUser: any;

  constructor(private authService: AuthService, private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchBooks();
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  private fetchBooks() {
    this.bookService.list().subscribe(books => {
      this.books = books;
      this.filterBooks();
    });
  }

  filterBooks() {
    if (!this.searchTerm) {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(book =>
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  toggleLike(book: IBook) {
    if (!this.currentUser) return;
    this.bookService.toggleLike(book.id, this.currentUser.uid).subscribe(updated => {
      // update the local array with the updated book
      this.books = this.books.map(b => b.id === updated.id ? updated : b);
      this.filterBooks();
      if (this.selectedBook && this.selectedBook.id === updated.id) {
        this.selectedBook = updated;
      }
    });
  }

  isLiked(book: IBook): boolean {
    return this.currentUser && book.likes?.includes(this.currentUser.uid) || false;
  }

  viewDetails(book: IBook) {
    this.selectedBook = book;
    this.showDetailsModal = true;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedBook = null;
  }
}
