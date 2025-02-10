import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserPoints } from '../../../../model/point/point.modul';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private apiUrl = environment.apiUrl + '/userPoints';

  constructor(private http: HttpClient) {}
  getUserPoints(userId: string): Observable<UserPoints | null> {
    return this.http.get<UserPoints[]>(`${this.apiUrl}?userId=${userId}`).pipe(
      map(points => points.length ? points[0] : null)
    );
  }

  updateUserPoints(userId: string, newPoints: number): Observable<UserPoints> {
    return this.getUserPoints(userId).pipe(
      switchMap(existing => {
        if (existing) {
          const updatedPoints = { ...existing, totalPoints: existing.totalPoints + newPoints };
          console.log("updatedPoints",updatedPoints);
          return this.http.put<UserPoints>(`${this.apiUrl}/${existing.id}`, updatedPoints);
        } else {
          const newEntry: UserPoints = { id: '', userId, totalPoints: newPoints };
          console.log("newEntry",newEntry);
          return this.http.post<UserPoints>(this.apiUrl, newEntry);
        }
      })
    );
  }
}
