import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserInfoService } from '../service/user-info.service';
import { map } from 'rxjs';

export const isAuthGuard: CanActivateFn = (route, state) => {
  const userInfo = inject(UserInfoService);
  const router = inject(Router);

  return userInfo.isAuthenticated().pipe(
        map((isAuthenticated) => isAuthenticated)  
      );
};
