import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// import { MatDialog } from '@angular/material/dialog';
// import { EditUserComponent } from '../edit-user/edit-user.component';
// import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
// import { User } from '../model/user';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
  ],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.scss',
})
export class ViewUsersComponent implements OnInit, AfterViewInit, OnDestroy {
  public userListEvent!: Subscription;

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'dob',
    'gender'
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    // private router: Router,
    private userService: UsersService
  ) // private dialog: MatDialog
  {}

  ngOnInit(): void {
    this.userListEvent = this.userService.updateUserList$.subscribe(() => {
      this.getAllUsers();
    });
    this.getAllUsers();
  }

  ngOnDestroy(): void {
    if (this.userListEvent) {
      this.userListEvent.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (val: any) => {
        // this.users = val;
        // console.log(val);
        // this.dataSource = new MatTableDataSource(val);
        // this.dataSource.paginator = this.paginator;
        console.log("user data: ", val);
        this.dataSource.data = val;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // updateUserList(): void {
  //   this.getAllUsers();
  // }

  // editUser(id: string): void {
  //   this.router.navigate([`/edit/${id}`]);
  // }

  // deleteUser(id: string): void {
  //   this.dialog.open(DeleteUserComponent, { width: '400px', data: { id } });
  // }
}
