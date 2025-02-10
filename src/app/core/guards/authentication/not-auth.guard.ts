import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserInfoService } from '../../service/user-info.service';
import { map } from 'rxjs';

export const notAuthGuard: CanActivateFn = (route, state) => {
   const userInfo = inject(UserInfoService);
  
    return userInfo.isAuthenticated().pipe(
      map((isAuthenticated) => !isAuthenticated)  
    );
};
