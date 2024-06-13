import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { msg: string; path: string }
  ) {}

  goBack() {
    this.dialogRef.close();
    if (this.data.path) this.router.navigate([this.data.path]);
  }
}
