import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { PointsActions } from '../../actions/points/points.actions';
import { PointsService } from '../../../features/collect/services/points/points.service';



@Injectable()
export class PointsEffects {
private pointsService = inject(PointsService);
private actions$ = inject(Actions);


  loadUserPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PointsActions.loadUserPoints),
      mergeMap(({ userId }) =>
        this.pointsService.getUserPoints(userId).pipe(
          map((userPoints) => PointsActions.loadUserPointsSuccess({ userPoints })),
          catchError((error) => of(PointsActions.loadUserPointsFailure({ error: error.message })))
        )
      )
    )
  );

  updateUserPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PointsActions.updateUserPoints),
      mergeMap(({ userId, newPoints }) =>
        this.pointsService.updateUserPoints(userId, newPoints).pipe(
          map((userPoints) => PointsActions.updateUserPointsSuccess({ userPoints })),
          catchError((error) => of(PointsActions.updateUserPointsFailure({ error: error.message })))
        )
      )
    )
  );
}
