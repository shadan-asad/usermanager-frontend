import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../services/users.service';
import { User } from '../model/user';
import { AlertComponent } from '../alert/alert.component';
// import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
  ],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss',
})
export class DeleteUserComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteUserComponent>,
    private userService: UsersService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  deleteUser(): void {
    console.log('delete: ', this.data.id);
    this.userService.deleteUser(this.data.id).subscribe({
      next: async (val) => {
        this.close();
        this.userService.updateUserList();
        // alert(`Account deleted successfully for the ID: ${this.data.id}`);
        this.dialog.open(AlertComponent, {
          data: {
            msg: `Account deleted successfully for the ID: ${this.data.id}`,
          },
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
