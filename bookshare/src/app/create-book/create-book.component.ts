import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBook } from '../shared/interfaces/book';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  bookForm: FormGroup;
  currentUser: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      imageUrl: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  addBook() {
    if (this.bookForm.valid && this.currentUser) {
      const newBook: IBook = {
        ...this.bookForm.value,
        id: crypto.randomUUID(),
        likes: [],
        creatorId: this.currentUser.uid
      };

      // Load existing books and add new one
      const existingBooks = this.getBooksFromStorage();
      existingBooks.push(newBook);
      this.saveBooksToStorage(existingBooks);

      // Reset form and redirect to catalog
      this.bookForm.reset();
      this.router.navigate(['/catalog']);
    }
  }

  private getBooksFromStorage(): IBook[] {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  }

  private saveBooksToStorage(books: IBook[]): void {
    localStorage.setItem('books', JSON.stringify(books));
  }

  cancel() {
    this.router.navigate(['/catalog']);
  }
} 