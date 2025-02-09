import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserInfoService } from '../service/user-info.service';
import { UserType } from '../../model/enum/userType.enum';
import { catchError, map, of } from 'rxjs';

export const isClientGuard: CanActivateFn = (route, state) => {
  const userInfo = inject(UserInfoService);
  const router = inject(Router);

  return userInfo.getAuthUser().pipe(
    map((user) => {
      if (user && user.role === UserType.CLIENT) {
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