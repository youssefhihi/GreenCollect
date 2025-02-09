import { CollectService } from './../../features/collect/services/collect/collect.service';
import { ResolveFn } from '@angular/router';
import { Collect } from '../../model/collect/collect.modul';
import { inject } from '@angular/core';

export const collectionsResolver: ResolveFn<Collect[]> = (route, state) => {
  const service = inject(CollectService);
  
  return service.getUserCollections();
};
