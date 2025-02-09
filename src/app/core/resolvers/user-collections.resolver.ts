import { ResolveFn } from '@angular/router';
import { CollectService } from '../../features/collect/services/collect/collect.service';
import { inject } from '@angular/core';
import { Collect } from '../../model/collect/collect.modul';

export const userCollectionsResolver: ResolveFn<Collect[]> = (route, state) => {
  const service = inject(CollectService);

   return service.getUserCollections();
};
