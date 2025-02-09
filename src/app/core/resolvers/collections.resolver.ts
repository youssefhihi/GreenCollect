import { CollectService } from './../../features/collect/services/collect/collect.service';
import { ResolveFn } from '@angular/router';
import { Collect } from '../../model/collect/collect.modul';
import { inject } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { UserInfoService } from '../service/user-info.service';

export const collectionsResolver: ResolveFn<Observable<Collect[]>> = (route, state) => {
  const service = inject(CollectService);
  const userInfo = inject(UserInfoService);

  return userInfo.getAuthUser().pipe(
    switchMap(user => {
      if (user) {
        return service.getCollections(user.address.city);
      } else {
        return of([]);
      }
    })
  );
};
