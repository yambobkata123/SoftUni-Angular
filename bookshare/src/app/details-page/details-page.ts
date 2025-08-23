import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBook } from '../shared/interfaces/book';

@Component({
  selector: 'app-details-page',
  imports: [],
  templateUrl: './details-page.html',
  styleUrls: ['./details-page.css']
})
export class DetailsPage {
  @Input() book!: IBook;   // <--- This is REQUIRED for template to access "book"

  @Output() close = new EventEmitter<void>();

  closeDetailsModal(): void {
    this.close.emit();
  }

  isLiked(book: IBook): boolean {
    return false;  // Placeholder logic
  }

  toggleLike(book: IBook): void {
    console.log('Like toggled for:', book.title);
  }
}
