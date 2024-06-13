import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, CommonModule, MatButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  logoPath = '../../assets/trianz-logo.jpg';
  homeTitle = 'Home';
  dashTitle = 'Dashboard';
  viewUsers = 'View';
  title!: string;

  constructor(public router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setTitle();
      });
  }

  setTitle() {
    if (this.router.url === '/') {
      this.title = this.homeTitle;
    } else if (this.router.url === '/dashboard') {
      this.title = this.dashTitle;
    } else if (this.router.url === '/view') {
      this.title = this.viewUsers;
    }
  }
}
