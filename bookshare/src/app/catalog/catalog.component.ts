
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IBook } from '../shared/interfaces/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CatalogComponent implements OnInit {
  books: IBook[] = [];
  query: string = '';
  allBooks: IBook[] = [];
  selectedBook: IBook | null = null;
  isLiked: boolean = false;
  

  constructor(private bookservice: BookService) {}

  ngOnInit(): void {
    this.bookservice.getAll().subscribe((data) => {
      this.allBooks = data;
      this.books = [...data]; 
    });
  }
  

  onSearch(): void {
    const q = this.query?.trim().toLowerCase() || '';
    if (q === '') {
      this.books = [...this.allBooks]; 
    } else {
      this.books = this.allBooks.filter(book =>
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q)
      );
    }
  }
  openDetails(book: IBook) {
    this.selectedBook = book;
  }

  toggleLike(): void {
    this.isLiked = !this.isLiked;
  }

}
