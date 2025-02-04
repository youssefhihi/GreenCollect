import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserInfoService } from '../service/user-info.service';

export const isClientGuard: CanActivateFn = (route, state) => {
   const userInfo = inject(UserInfoService);
    const router = inject(Router);
  
    if (!userInfo.isAuthenticated()) {
      router.navigate(['/login']);
      return false;
    }
    return true;
  return true;
};
