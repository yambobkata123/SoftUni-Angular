import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IBook } from '../shared/interfaces/book';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

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

  constructor(
    private bookservice: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  
    this.bookservice.getAll().subscribe(data => {
      this.books = data.filter(book => book._id === this.id);
    });
  }

  editBook(form: NgForm): void {
    this.bookservice.updateBook(this.id!, form.value).subscribe({
      next: (data) => {
        console.log('Book updated successfully:', data);
        Object.assign(this.books[0], data);  // обновява локалния обект
        this.router.navigate(['/catalog']);
      },
      error: (error) => {
        console.error('Error updating book:', error);
      }
    });
  }  
}

