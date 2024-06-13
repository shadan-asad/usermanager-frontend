import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { UserListComponent } from '../user-list/user-list.component';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, UserListComponent, AddUserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
