import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { User } from '../model/user';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent {
  fields = [
    'name',
    'email',
    'phone',
    'dob',
    'gender',
    'city',
    'state',
    'country',
  ];

  data: any = [];
  constructor(
    private router: Router,
    private userService: UsersService,
    public dialog: MatDialog
  ) {
    const nav = this.router.getCurrentNavigation();
    this.data = nav?.extras?.state?.['data'];
    console.log(this.data);
  }

  submitForm() {
    this.userService.addUser(this.data).subscribe({
      next: (val) => {
        console.log('added: ', val);
        this.dialog.open(AlertComponent, {
          data: { msg: 'User added successfully!', path: '/' },
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  cancelSubmit() {
    this.router.navigate(['/']);
  }
}
