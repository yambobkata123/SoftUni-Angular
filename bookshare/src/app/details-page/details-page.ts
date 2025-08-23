import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IBook } from '../shared/interfaces/book';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.html',
  styleUrls: ['./details-page.css'],
  standalone: true
})
export class DetailsPage {
  @Input() book!: IBook;
  @Input() isLiked: boolean = false;
  
  @Output() likeToggled = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  toggleLike(): void {
    this.likeToggled.emit();
  }

  closeDetailsModal(): void {
    this.close.emit(); // известява родителя да скрие модала
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
