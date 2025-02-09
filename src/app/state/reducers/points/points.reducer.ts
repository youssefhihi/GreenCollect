import { createReducer, on } from '@ngrx/store';
import { UserPoints } from '../../../model/point/point.modul';
import { PointsActions } from '../../actions/points/points.actions';

export interface PointsState {
  userPoints: UserPoints | null;
  error: string | null;
}

export const initialState: PointsState = {
  userPoints: null,
  error: null,
};

export const pointsReducer = createReducer(
  initialState,
  
  on(PointsActions.loadUserPointsSuccess, (state, { userPoints }) => ({
    ...state,
    userPoints,
    error: null,
  })),


  on(PointsActions.updateUserPointsSuccess, (state, { userPoints }) => ({
    ...state,
    userPoints,
    error: null,
  })),

  on(PointsActions.loadUserPointsFailure, PointsActions.updateUserPointsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
