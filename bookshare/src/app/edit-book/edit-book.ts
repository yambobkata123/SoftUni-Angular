import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IBook } from '../shared/interfaces/book';
import { AuthService } from '../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../shared/services/book.service';

@Component({
  selector: 'edit-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-book.html',
  styleUrls: ['./edit-book.css']
})
export class EditBook implements OnInit {

  editingBook: IBook | null = null;
  editModel: Partial<IBook> = {};
  currentUser: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(u => this.currentUser = u);
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.get(bookId).subscribe(book => {
        this.editingBook = book;
        this.editModel = {
          title: book.title,
          author: book.author,
          description: book.description,
          imageUrl: book.imageUrl
        };
      });
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/my-books']);
  }

  saveEdit(): void {
    if (!this.editingBook) return;
    const id = this.editingBook.id;
    const payload: Partial<IBook> = {
      title: this.editModel.title?.trim() || this.editingBook.title,
      author: this.editModel.author?.trim() || this.editingBook.author,
      description: this.editModel.description?.trim() || this.editingBook.description,
      imageUrl: (this.editModel.imageUrl || '').toString() || this.editingBook.imageUrl
    };
    this.bookService.update(id, payload).subscribe(() => {
      this.cancelEdit();
    });
  }
}
