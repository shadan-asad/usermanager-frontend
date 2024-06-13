import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class AddUserComponent implements OnInit {
  minDate!: Date;
  maxDate!: Date;
  countries: string[] = ['India', 'Canada', 'USA'];
  addUserForm: any;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 10, 11, 31);
  }

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    this.addUserForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._-]+@[a-z.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    });
  }

  addUser(): void {
    this.addUserForm.markAllAsTouched();
    if (this.addUserForm.invalid) return;
    if (this.addUserForm.valid) {
      const data = this.addUserForm.value as User;
      const newDob = new Date(data.dob);
      data.dob = newDob.toISOString().split('T')[0];

      this.router.navigate(['/preview'], {
        state: { data: data },
      });
    }
  }

  clearForm() {
    this.setupForm();
    // this.addUserForm.reset({
    //   name: '',
    //   email: '',
    //   phone: '',
    //   dob: '',
    //   gender: '',
    //   city: '',
    //   state: '',
    //   country: '',
    //   terms: false,
    // });
    // this.addUserForm.controls.name.markAsUntouched();
  }

  // closeForm(val: boolean): void {
  // this.dialogRef.close(val);
  // this.dialogRef.afterClosed().subscribe({
  //   next: () => {
  //     this.userList.updateUserList();
  //   },
  // });
  // }
}
