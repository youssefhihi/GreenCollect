import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PointsState } from '../../reducers/points/points.reducer';

export const selectPointsState = createFeatureSelector<PointsState>('points');

export const selectUserPoints = createSelector(
  selectPointsState,
  (state) => state.userPoints
);

export const selectPointsError = createSelector(
  selectPointsState,
  (state) => state.error
);