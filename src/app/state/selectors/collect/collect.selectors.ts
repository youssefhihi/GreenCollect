import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollectState } from '../../reducers/collect/collect.reducer';

export const selectCollectState = createFeatureSelector<CollectState>('collect');

export const selectCollects = createSelector(
    selectCollectState,
    (state: CollectState) => state.collects
    );

export const selectCollectLoading = createSelector(
    selectCollectState,
    (state: CollectState) => state.loading
    );

export const selectCollectError = createSelector(
    selectCollectState,
    (state: CollectState) => state.error
    );

export const selectCollectSuccess = createSelector(
    selectCollectState, 
    (state: CollectState) => state.success
    );
