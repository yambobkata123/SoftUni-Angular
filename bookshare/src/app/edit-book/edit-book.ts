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
  id:string | null = '';
  constructor(
    private bookservice: BookService,
    private router: Router,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    
this.bookservice.getAll().pipe(map((data)=>data.filter(book=>book._id == book._id))).subscribe((data)=>{
  this.books = data
  
})
}
  editBook(form: NgForm) {
    const book: IBook = form.value;
    book._id = this.id || '';
    this.bookservice.updateBook(book._id, book).subscribe((data) => {
      console.log('Book updated successfully:', data);
      this.router.navigate(['/home']);
    });
  }    
}
