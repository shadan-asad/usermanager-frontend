import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private updateUserListSource = new Subject<void>();
  updateUserList$ = this.updateUserListSource.asObservable();

  updateUserList() {
    this.updateUserListSource.next();
  }

  addUser(data: User): Observable<User> {
    data.name = data.name?.trim();
    return this.http
      .post<User>(this.url, data)
      .pipe(catchError(this.handleError));
  }

  getUserDetails(id: string): Observable<User> {
    return this.http
      .get<User>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.url}/allUsers`)
      .pipe(catchError(this.handleError));
    
  }

  editUser(id: string, data: User): Observable<User> {
    console.log("in edit ser: ",id, data)
    data.name = data.name?.trim();
    return this.http
      .put<User>(`${this.url}/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  deleteUser(id: string): Observable<User> {
    return this.http
      .delete<User>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
