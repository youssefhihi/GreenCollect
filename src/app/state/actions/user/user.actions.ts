import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../model/user/user.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'User Login': props<{ email: string, password: string  }>(),
    'User Register': props<{ user: User  }>(),
    'User Login Success': props<{ data: User }>(),
    'User Register Success': props<{ success: string }>(),
    'User Login Failure': props<{ error: string }>(),
    'User Register Failure': props<{ error: string }>(),
  }
});

export const UpdateProfileActions = createActionGroup({
  source: 'UpdateProfile',
  events: {
    'UpdateProfile ': props<{ data: User }>(),
    'UpdateProfile Success': props<{ data: User }>(),
    'UpdateProfile Failure': props<{ error: string }>(),
  }
});
