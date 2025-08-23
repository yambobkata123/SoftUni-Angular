import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IBook } from '../shared/interfaces/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string = '';
  results: IBook[] = [];
  allBooks: IBook[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAll().subscribe((books: IBook[]) => {
      this.allBooks = books;
      this.results = [...books];
    });
  }

  onSearch(): void {
    const q = this.query.trim().toLowerCase();
    if (q === '') {
      this.results = [...this.allBooks];
    } else {
      this.results = this.allBooks.filter(book =>
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q)
      );
    }
  }
}