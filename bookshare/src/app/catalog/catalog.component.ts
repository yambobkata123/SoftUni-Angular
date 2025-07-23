
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {
  books = [{ title: 'Sample Book', author: 'Author' }];
  ngOnInit(): void {}
}
