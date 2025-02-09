import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Collect } from '../../../model/collect/collect.modul';

export const CollectActions = createActionGroup({
  source: 'Collect',
  events: {
    'Collect Add Collects': props<{ data: Collect }>(),
    'Collect Add Collects Success': props<{ data: Collect }>(),
    'Collect Add Collects Failure': props<{ error: string }>(),
  }
});
export const loadCollects = createAction(
  '[Collect] Load Collects',
  props<{ collects: Collect[] }>()
);

export const UpdateCollectStatusActions = createActionGroup({
  source: 'UpdateCollectStatus',
  events: {
    'UpdateCollectStatus Update': props<{ data: Collect }>(),
    'UpdateCollectStatus Update Success': props<{ data: Collect }>(),
    'UpdateCollectStatus Update Failure': props<{ error: string }>(),
  }
});


export const DeleteCollectActions = createActionGroup({
  source: 'DeleteCollect',
  events: {
    'DeleteCollect delete': props<{ id: string}>(),
    'DeleteCollect delete Success': props<{ success: string, collectId: string  }>(),
    'DeleteCollect delete Failure': props<{ error: string }>(),
  }
});
