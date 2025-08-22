import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IBook } from '../shared/interfaces/book';

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

  ngOnInit(): void {
    const savedBooks = localStorage.getItem('books');
    this.allBooks = savedBooks ? JSON.parse(savedBooks) : [];
    this.results = [...this.allBooks];
  }

  onSearch() {
    const q = this.query.trim().toLowerCase();
    if (!q) {
      this.results = [...this.allBooks];
      return;
    }
    this.results = this.allBooks.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      (b.description || '').toLowerCase().includes(q)
    );
  }
} 