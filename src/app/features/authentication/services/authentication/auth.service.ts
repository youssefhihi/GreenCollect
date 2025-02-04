import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { User } from '../../../../model/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${email}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            const user = users[0];
            localStorage.setItem('token', this.generateToken(user));
            return user;
          } else {
            throw new Error('Invalid credentials');
          }
        }),
        catchError(error => throwError(() => new Error(error.message || 'Login failed')))
      );
  }

  
  register(user: User): Observable<string> {
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${user.email}`).pipe(
      switchMap(existingUsers => {
        if (existingUsers.length > 0) {
          return throwError(() => new Error('Email already exists'));
        }
        return this.http.post<User>(`${this.apiUrl}/users`, user).pipe(
          map(() => 'User registered successfully')
        );
      }),
      catchError(error => throwError(() => new Error(error.message || 'Registration failed')))
    );
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${email}`).pipe(
      map(users => {
        if (users.length > 0) {
          return users[0];
        } else {
          throw new Error('User not found');
        }
      }),
      catchError(error => throwError(() => new Error(error.message || 'User not found')))
    )
  }
  updateProfile(user: User): Observable<User> {
   return  this.getUserByEmail(user.email).pipe(
      switchMap(existingUser => {
        if (existingUser) {
          return this.http.put<User>(`${this.apiUrl}/users/${existingUser.id}`, user).pipe(
            map(() => user)
          );
        } else {
          throw new Error('User not found');
        }
      }),
      catchError(error => throwError(() => new Error(error.message || 'User not found')))
    )
    
  }
  
  private generateToken(user: User): string {
    return btoa(`${user.email}:${user.password}`);
  }
  
}

