import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBook } from '../shared/interfaces/book';
import { AuthService } from '../core/services/auth.service';
import { BookService } from '../shared/services/book.service';

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
    private authService: AuthService,
    private bookService: BookService
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
      const payload = {
        title: this.bookForm.value.title,
        author: this.bookForm.value.author,
        description: this.bookForm.value.description,
        imageUrl: this.bookForm.value.imageUrl,
        creatorId: this.currentUser.uid
      } as Omit<IBook, 'id' | 'likes'>;

      this.bookService.create(payload).subscribe(() => {
        this.bookForm.reset();
        this.router.navigate(['/catalog']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/catalog']);
  }
} 