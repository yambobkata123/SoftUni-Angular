import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IBook } from '../shared/interfaces/book';
import { AuthService } from '../core/services/auth.service';
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
  editingBook: IBook | null = null;
  editModel: Partial<IBook> = {};

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshBooks();
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.editingBook = this.books.find(b => b.id === bookId) || null;
      if (this.editingBook) {
        this.editModel = {
          title: this.editingBook.title,
          author: this.editingBook.author,
          description: this.editingBook.description,
          imageUrl: this.editingBook.imageUrl
        };
      }
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/my-books']); // връщане към списъка
  }

  saveEdit(): void {
    if (!this.editingBook) return;

    const all = this.readAllBooks();
    const idx = all.findIndex(b => b.id === this.editingBook!.id);
    if (idx !== -1) {
      all[idx] = {
        ...all[idx],
        title: this.editModel.title?.trim() || all[idx].title,
        author: this.editModel.author?.trim() || all[idx].author,
        description: this.editModel.description?.trim() || all[idx].description,
        imageUrl: this.editModel.imageUrl?.trim() || all[idx].imageUrl
      };
      this.writeAllBooks(all);
    }

    this.cancelEdit();
  }

  private getCurrentUser() {
    let currentUser: any = null;
    this.authService.user$.subscribe(u => currentUser = u).unsubscribe();
    return currentUser;
  }

  private readAllBooks(): IBook[] {
    const saved = localStorage.getItem('books');
    return saved ? JSON.parse(saved) : [];
  }

  private writeAllBooks(all: IBook[]): void {
    localStorage.setItem('books', JSON.stringify(all));
  }

  private refreshBooks(): void {
    const allBooks = this.readAllBooks();
    const user = this.getCurrentUser();
    this.books = user ? allBooks.filter(b => b.creatorId === user.uid) : [];
  }
}
