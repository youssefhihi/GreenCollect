import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CollectService } from '../../../features/collect/services/collect/collect.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { CollectActions, DeleteCollectActions, UpdateCollectStatusActions } from '../../actions/collect/collect.actions';
import { PointsActions } from '../../actions/points/points.actions';
import { Collect } from '../../../model/collect/collect.modul';



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

  updateCollect$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UpdateCollectStatusActions.updateCollectStatusUpdate),
      mergeMap(({ data }) => 
        this.service.updateCollectionStatus(data.id, data.status).pipe(
          switchMap((updatedCollect: Collect) => {
            const actions: any[] = [
              UpdateCollectStatusActions.updateCollectStatusUpdateSuccess({ data: updatedCollect })
            ];
            if (updatedCollect.status === 'Validée') {
              const points = this.calculatePoints(updatedCollect.wasteType, updatedCollect.estimatedWeight);
              actions.push(PointsActions.updateUserPoints({ userId: updatedCollect.user.id, newPoints: points }));
            }

            return actions;
          }),
          catchError((error) => 
            of(UpdateCollectStatusActions.updateCollectStatusUpdateFailure({ error }))
          )
        )
      )
    )
  );

  deleteCollect$ = createEffect(() => this.actions$.pipe(
    ofType(DeleteCollectActions.deleteCollectDelete),
    mergeMap(({ id }) => this.service.deleteCollection(id).pipe(
    map(() => DeleteCollectActions.deleteCollectDeleteSuccess( { success: 'Collection successfully deleted', collectId: id })),
  catchError((error) => of(DeleteCollectActions.deleteCollectDeleteFailure({ error })))
    ))
    ));

    private calculatePoints(wasteTypes: string[], weight: number): number {
      const pointsMap: { [key: string]: number } = {
        'Plastique': 2,
        'Verre': 1,
        'Papier': 1,
        'Métal': 5
      };
    
      let wastePoints = 0;
      let totalPoints = 0;

      wasteTypes.forEach(type => {
        wastePoints += pointsMap[type] || 0;  
      });
    
      totalPoints = (wastePoints / wasteTypes.length) * (weight / 1000);

      console.log("Total points for wasteTypes", wasteTypes, "Weight:", weight, "Points:", totalPoints);
      return totalPoints;
    }
    
}
