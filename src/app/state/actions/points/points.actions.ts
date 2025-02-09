import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserPoints } from '../../../model/point/point.modul';


export const PointsActions = createActionGroup({
  source: 'Points',
  events: {
    'Load User Points': props<{ userId: string }>(),
    'Load User Points Success': props<{ userPoints: UserPoints | null }>(),
    'Load User Points Failure': props<{ error: string }>(),

    'Update User Points': props<{ userId: string; newPoints: number }>(),
    'Update User Points Success': props<{ userPoints: UserPoints }>(),
    'Update User Points Failure': props<{ error: string }>(),
  }
});
