import { Component } from '@angular/core';
import { FormsModule,  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IBook } from '../shared/interfaces/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css'
})
export class CreateBookComponent {

  constructor(
    private router: Router,
    private bookservice: BookService
  ) {
    
  }
  addBook(form:NgForm) {
    const book: IBook = form.value;
    book.creatorId = localStorage.getItem('user') || '';
    
this.bookservice.createBook(book).subscribe((data)=>{
  this.router.navigate(['/home']);
});
    
  }
} 