import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CollectService } from '../../../features/collect/services/collect/collect.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CollectActions, DeleteCollectActions, UpdateCollectStatusActions } from '../../actions/collect/collect.actions';



@Injectable()
export class CollectEffects {

  private actions$ = inject(Actions);
  private service = inject(CollectService);

  addCollect$ = createEffect(() => this.actions$.pipe(
    ofType(CollectActions.collectAddCollects),
    mergeMap(({ data }) => this.service.addCollectRequest(data).pipe(
      map((data) => CollectActions.collectAddCollectsSuccess({ data })),
      catchError((error) => of(CollectActions.collectAddCollectsFailure({ error })))
    ))
  ));

  updateCollect$ = createEffect(() => this.actions$.pipe(
    ofType(UpdateCollectStatusActions.updateCollectStatusUpdate),
    mergeMap(({ data }) => this.service.updateCollectionStatus(data.id, data.status).pipe(
      map((data) => UpdateCollectStatusActions.updateCollectStatusUpdateSuccess({ data })),
      catchError((error) => of(UpdateCollectStatusActions.updateCollectStatusUpdateFailure({ error })))
    ))
  ));

  deleteCollect$ = createEffect(() => this.actions$.pipe(
    ofType(DeleteCollectActions.deleteCollectDelete),
    mergeMap(({ id }) => this.service.deleteCollection(id).pipe(
    map(() => DeleteCollectActions.deleteCollectDeleteSuccess( { success: 'Collection successfully deleted', collectId: id })),
  catchError((error) => of(DeleteCollectActions.deleteCollectDeleteFailure({ error })))
    ))
    ))
}
