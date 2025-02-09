import { CollectService } from './../../features/collect/services/collect/collect.service';
import { ResolveFn } from '@angular/router';
import { Collect } from '../../model/collect/collect.modul';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoService } from '../service/user-info.service';

export const collectionsResolver: ResolveFn<Observable<Collect[]>> = (route, state) => {
  const service = inject(CollectService);
  const userInfo = inject(UserInfoService);
  let city = '';
  userInfo.getAuthUser().subscribe((user) => {
    if (user) {
      city =  user.address.city
    }
  })
  return service.getCollections(city);
};
