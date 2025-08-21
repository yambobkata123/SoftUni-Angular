
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { IBook } from '../shared/interfaces/book';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class CatalogComponent implements OnInit {
  books: IBook[] = [];
  filteredBooks: IBook[] = [];
  searchTerm: string = '';
  showAddForm: boolean = false;
  showDetailsModal: boolean = false;
  selectedBook: IBook | null = null;
  bookForm: FormGroup;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadBooks();
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  loadBooks() {
    // Mock data - in real app, this would load from Firebase
    this.books = [
      {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
        imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
        likes: [],
        creatorId: 'user1'
      },
      {
        id: '2',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'The story of young Scout Finch and her father Atticus in a racially divided Alabama town.',
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        likes: [],
        creatorId: 'user1'
      }
    ];
    this.filterBooks();
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

  addBook() {
    if (this.bookForm.valid && this.currentUser) {
      const newBook: IBook = {
        ...this.bookForm.value,
        id: crypto.randomUUID(),
        likes: [],
        creatorId: this.currentUser.uid
      };

      this.books.push(newBook);
      this.filterBooks();
      this.bookForm.reset();
      this.showAddForm = false;
    }
  }

  toggleLike(book: IBook) {
    if (!this.currentUser) return;

    const userId = this.currentUser.uid;
    const likes = book.likes || [];
    const userLiked = likes.includes(userId);

    if (userLiked) {
      book.likes = likes.filter(id => id !== userId);
    } else {
      book.likes = [...likes, userId];
    }
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

  closeModal() {
    this.showAddForm = false;
    this.bookForm.reset();
  }
}
