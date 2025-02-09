import { createReducer, on } from '@ngrx/store';
import { Collect } from '../../../model/collect/collect.modul';
import { CollectActions, DeleteCollectActions, loadCollects, UpdateCollectStatusActions } from '../../actions/collect/collect.actions';

export const collectFeatureKey = 'collect';

export interface CollectState {
  loading: boolean;
  error: string | null;
  collects: Collect[]; 
  success: string | null;
  deletedCollectId: string | null;
}

export const initialState: CollectState = {
  loading: false,
  error: null,
  collects: [],
  success: null,
  deletedCollectId: null,
};

export const collectReducer = createReducer(
  initialState,
  on(loadCollects, (state, { collects }) => ({
    ...state,
    collects: collects,
    loading: true, 
    error: null,
  })),
  on(CollectActions.collectAddCollects, state => ({ 
    ...state,
    loading: true,
  })),
  on(CollectActions.collectAddCollectsSuccess, (state, { data }) => ({ 
    ...state,
    loading: false,
    collects: [...state.collects, data],
  })),
  on(CollectActions.collectAddCollectsFailure, (state, { error }) => ({ 
    ...state,
    loading: false,
    error: error,
  })),

  on(UpdateCollectStatusActions.updateCollectStatusUpdate, state => ({ 
    ...state,
    loading: true 
  })),
  on(UpdateCollectStatusActions.updateCollectStatusUpdateSuccess, (state, { data }) => ({ 
    ...state,
    loading: false,
    collects: state.collects.map(collect =>
      collect.id === data.id ? { ...collect, status: data.status } : collect
    ),
  })),
  on(UpdateCollectStatusActions.updateCollectStatusUpdateFailure, (state, { error }) => ({ 
    ...state,
    loading: false,
    error: error,
  })),

  on(DeleteCollectActions.deleteCollectDelete, state => ({ 
    ...state,
    loading: true 
  })),
  on(DeleteCollectActions.deleteCollectDeleteSuccess, (state, { success, collectId }) => ({ 
    ...state,
    loading: false,
    success: success,
    collects: state.collects.filter(collect => collect.id !== collectId), 
  })),
  on(DeleteCollectActions.deleteCollectDeleteFailure, (state, { error }) => ({ 
    ...state,
    loading: false,
    error: error,
  })),
);
