import { Component } from '@angular/core';
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
import { CommonModule, Location } from '@angular/common';
import { UsersService } from '../services/users.service';
import { User } from '../model/user';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-edit-user',
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
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class EditUserComponent {
  errorMsg = '';
  userId!: string;
  initialData!: any;
  minDate!: Date;
  maxDate!: Date;
  countries: string[] = ['India', 'Canada', 'USA'];

  editUserForm = this.formBuilder.group({
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
    country: ['', Validators.required]
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private location: Location,
    public dialog: MatDialog
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 10, 11, 31);
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.setUserDetails(this.userId);
  }

  setUserDetails(id: string) {
    this.userService.getUserDetails(id).subscribe({
      next: (val) => {
        this.editUserForm.patchValue(val);
        this.initialData = val;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  editUser(): void {
    this.errorMsg = '';
    this.editUserForm.markAllAsTouched();
    if (this.editUserForm.invalid) {console.log("invalid f", this.editUserForm.value);return;}
    if (this.validateForm()) {
      const data = this.editUserForm.value as User;
      const newDob = new Date(data.dob);
      data.dob = newDob.toISOString().split('T')[0];

      this.userService
        .editUser(String(this.initialData.id), this.editUserForm.value as User)
        .subscribe({
          next: (val) => {
            console.log('edited: ', val);
            this.dialog.open(AlertComponent, {
              data: { msg: 'User details updated successfully!', path: 'dashboard' },
            });
            this.userService.updateUserList();
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }

  cancelEdit(): void {
    this.location.back();
  }

  validateForm(): boolean {
    // Check if any values are changed
    const currentData = this.editUserForm.value as User;
    console.log('ini: ', typeof this.initialData);
    console.log('new: ', typeof currentData);
    if (
      this.initialData.name === currentData.name?.trim() &&
      this.initialData.email === currentData.email &&
      this.initialData.phone === currentData.phone &&
      this.initialData.dob === currentData.dob &&
      this.initialData.city === currentData.city &&
      this.initialData.state === currentData.state &&
      this.initialData.country === currentData.country &&
      this.initialData.gender === currentData.gender
    ) {
      this.errorMsg = 'No values changed!';
      return false;
    }
    return true;
  }
}
