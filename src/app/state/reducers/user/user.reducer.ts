import { createReducer, on } from '@ngrx/store';
import { UpdateProfileActions, UserActions } from '../../actions/user/user.actions';
import { User } from '../../../model/user/user.model';

export const userFeatureKey = 'user';

export interface UserState {
  loading: boolean;
  error: string | null;
  data: User | null;
  isAuthenticated: boolean;
  success: string | null;
}

export const initialState: UserState = {
  loading: false,
  error: null,
  data: null,
  isAuthenticated: false,
  success: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.userLogin, state => (
    console.log('User login action'),
    { ...state, loading: true , success: null}
  )),
  on(UserActions.userLoginSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    data : data,
    isAuthenticated: true,
    error: null,
    success: null
  })),
  on(UserActions.userLoginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    isAuthenticated: true,
    error: error,
    data: null,
    success: null
  })),
  on(UserActions.userRegister, state => ({ ...state, loading: true })),
  on(UserActions.userRegisterSuccess, (state, { success }) => ({
    ...state,
    loading: false,
    data: null,
    isAuthenticated: false,
    error: null,
    success: success
  })),
  on(UserActions.userRegisterFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
    data: null,
    isAuthenticated: false,
    success: null,
    
  })),
  on(UpdateProfileActions.updateProfile, state => ({ ...state, loading: true })),
  on(UpdateProfileActions.updateProfileSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    data: data,
    isAuthenticated: true,
    error: null,
    success: "Profil mis à jour avec succéss"
  })),
  on(UpdateProfileActions.updateProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
    data: null,
    isAuthenticated: true,
    success: null
  }))
);

