import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { HeaderComponent } from './core/header.component/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
imports: [RouterOutlet,  HeaderComponent],
})
export class AppComponent {
  
}