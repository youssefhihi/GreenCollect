import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, throwError } from 'rxjs';
import { User } from '../../model/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  getUserId(): string | null {
    this.getAuthUser().subscribe((user) => {
      if (user) {
        return user.id;
      } else {
        return null;
      }
    });
    return null;
  }
  getAuthUser(): Observable<User> {
    const token = this.getToken();
    if (token !== null) {
      const decoded = atob(token);
      const [email, password] = decoded.split(':');
  
      if (!email || !password) {
        console.error('Invalid token format');
        return throwError(() => new Error('Invalid token format'));
      }
      return this.getUserByEmail(email);
    }
    return throwError(() => new Error('Token not found'));}
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${email}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            return users[0];
          } else {
            throw new Error('User not found');
          }
        }),
        catchError(error => throwError(() => new Error(error.message || 'User not found')))
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

 

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token !== null) {
      const decoded = atob(token);
      const [email, password] = decoded.split(':');
  
      if (!email || !password) {
        console.error('Invalid token format');
        return false;
      }
      this.getUserByEmail(email).pipe(
        map((user) => {
          if (user.password != password) {
            return false;
          }
          return true;
        })
      );
    }
    return false;
  }
  



}