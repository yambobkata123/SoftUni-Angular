import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IBook } from '../shared/interfaces/book';
import { AuthService } from '../core/services/auth.service';
import { BookService } from '../services/book.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {
  books: IBook[] = [];

  constructor(
    private authService: AuthService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookService.getAll().pipe(map((data)=>data.filter(book=>book.creatorId == localStorage.getItem('user')))).subscribe((data)=>{
      this.books = data
          }
          )
  }

  deleteBook(id:string){
    
this.bookService.deleteBook(id).subscribe(()=>{
  this.router.navigate(['/catalog']);
})

  }
}
