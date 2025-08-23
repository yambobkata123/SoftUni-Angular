import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IBook } from '../shared/interfaces/book';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edit-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-book.html',
  styleUrls: ['./edit-book.css']
})
export class EditBook implements OnInit {
  books: IBook[] = [];
  id: string | null = null;
  book: IBook | null = null;

  constructor(
    private bookservice: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  
    this.bookservice.getAll().subscribe(data => {
      this.books = data.filter(book => book._id === this.id);
      if (this.books.length > 0) {
        this.book = { ...this.books[0] };
      }
    });
  }

  editBook(form: NgForm): void {
    if (form.valid && this.book) {
      this.bookservice.updateBook(this.id!, this.book).subscribe({
        next: (data) => {
          console.log('Book updated successfully:', data);
          Object.assign(this.books[0], data);
          this.router.navigate(['/catalog']);
        },
        error: (error) => {
          console.error('Error updating book:', error);
        }
      });
    } else {
      console.error('Form is invalid or book is null');
    }
  }  
}
