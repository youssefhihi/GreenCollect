import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserInfoService } from '../service/user-info.service';
import { catchError, map, of } from 'rxjs';
import { UserType } from '../../model/enum/userType.enum';

export const isCollectorGuardGuard: CanActivateFn = (route, state) => {
   const userInfo = inject(UserInfoService);
    const router = inject(Router);
  
    return userInfo.getAuthUser().pipe(
      map((user) => {
        if (user && user.role === UserType.COLLECTOR) {
          return true; 
        } else {
          router.navigate(['auth/login']);
          return false;
        }
      }),
      catchError(() => {
        router.navigate(['auth/login']);
        return of(false);
      })
    );
};
