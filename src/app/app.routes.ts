import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { PreviewComponent } from './preview/preview.component';
import { ViewUsersComponent } from './view-users/view-users.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'edit/:id', component: EditUserComponent, title: 'Edit Details' },
  { path: 'preview', component: PreviewComponent },
  {
    path: 'dashboard',
    component: UserListComponent,
    title: 'Dashboard',
  },
  { path: 'view', component: ViewUsersComponent },
];
