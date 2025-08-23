import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { IBook } from '../shared/interfaces/book';
import { BookService } from '../services/book.service'; 

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.html',
  styleUrls: ['./details-page.css'],
  standalone: true,
  imports: [CommonModule, RouterModule] 
})
export class DetailsPage implements OnInit { 
  book: IBook | null = null; 
  isLiked: boolean = false;
  
  @Output() likeToggled = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    
    if (bookId) {
      this.bookService.getAll().subscribe(books => {
        this.book = books.find(book => book._id === bookId) || null;
        
        if (!this.book) {
          this.router.navigate(['/catalog']);
        }
      });
    }
  }

  toggleLike(): void {
    this.likeToggled.emit();
  }

  closeDetailsModal(): void {
    this.router.navigate(['/catalog']);
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  get userId(): string | null {
    return localStorage.getItem('user');
  }

  get isCreator(): boolean {
    return this.book?.creatorId === this.userId;
  }
}