import { User } from './../../../../model/user/user.model';
import { Collect } from './../../../../model/collect/collect.modul';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfoService } from '../../../../core/service/user-info.service';
import { environment } from '../../../../../environments/environment';
import { catchError, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectService {

  private apiUrl = environment.apiUrl + '/collects';
  constructor(private http: HttpClient,private userInfoService : UserInfoService) { 
  }

  addCollectRequest(request: Collect): Observable<Collect> {
        return this.getUserCollections().pipe(
          switchMap((collections: Collect[]) => {
            const pendingRequests = collections.filter(
              (req) => req.userId === request.userId && req.status === 'pending'
            );
  
            const totalWeight = pendingRequests.reduce((sum, req) => sum + req.estimatedWeight, 0);
  
            if (pendingRequests.length >= 3) {
              throw new Error("Vous avez atteint la limite de 3 demandes en attente.");
            }
  
            if (request.estimatedWeight < 1000) {
              throw new Error("Le poids minimal doit être de 1000g.");
            }
  
            if (totalWeight + request.estimatedWeight > 10000) {
              throw new Error("Le poids total ne doit pas dépasser 10 kg.");
            }
            
            return this.requestCollection(request);
          }),
          catchError((error) => {
            console.error("Error in addCollectRequest:", error);
            throw error;
        })
        );
      }


  getUserCollections(): Observable<Collect[]> {
    return this.userInfoService.getAuthUser().pipe(
      switchMap((user: User) => {
        if (!user) {
          throw new Error("Utilisateur non connecté.");
        }
        return this.http.get<Collect[]>(`${this.apiUrl}?userId=${user.id}`);
      }),
      catchError((error) => {
        console.error("Error in getUserCollections:", error);
        throw error;
      })
    );
  }

  requestCollection(request: Collect): Observable<Collect> {
    return this.http.post<Collect>(`${this.apiUrl}`, request);
  }


  getCollections(city: string): Observable<Collect[]> {
    return this.http.get<Collect[]>(`${this.apiUrl}?address.city=${city}`);
  }

  updateCollectionStatus(id: string, status: string): Observable<Collect> {
    return this.http.patch<Collect>(`${this.apiUrl}/${id}`, { status });
  }

  deleteCollection(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
