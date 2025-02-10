import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, forkJoin, map, Observable, of, switchMap, throwError } from 'rxjs';
import { User } from '../../model/user/user.model';
import { Collect } from '../../model/collect/collect.modul';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

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

 

  isAuthenticated(): Observable<boolean> {
    const token = this.getToken();
    if (token !== null) {
      const decoded = atob(token);
      const [email, password] = decoded.split(':');
      
      if (!email || !password) {
        return of(false); 
      }
  
      return this.getUserByEmail(email).pipe(
        map((user) => user?.password === password)
      );
    }
    return of(false); 
  }
  
  updateProfile(user: User): Observable<User> {
    return this.getUserByEmail(user.email).pipe(
      switchMap(existingUser => {
        if (!existingUser) {
          throw new Error('User not found');
        }
  
        return this.http.put<User>(`${this.apiUrl}/users/${existingUser.id}`, user).pipe(
          switchMap(updatedUser => {
            return this.http.get<Collect[]>(`${this.apiUrl}/collects`).pipe(
              switchMap(collects => {
                const updatedCollects = collects
                  .filter(collect => collect.user.email === updatedUser.email)
                  .map(collect => ({
                    ...collect,
                    user: updatedUser
                  }));
  
                if (updatedCollects.length === 0) {
                  return of(updatedUser);
                }
  
                return forkJoin(
                  updatedCollects.map(collect =>
                    this.http.put<Collect>(`${this.apiUrl}/collects/${collect.id}`, collect)
                  )
                ).pipe(map(() => updatedUser));
              })
            );
          })
        );
      }),
      catchError(error => throwError(() => new Error(error.message || 'User update failed')))
    );
  }
  



}