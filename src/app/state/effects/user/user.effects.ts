import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from '../../actions/user/user.actions';
import { catchError, map, merge, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../../../features/authentication/features/authentication/services/authentication/auth.service';



@Injectable()
export class UserEffects {

  private actions$ = inject(Actions);
  private authService = inject(AuthService);



  login$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(UserActions.userLogin),
    tap((action) => console.log('User login action', action)),
    mergeMap((action) => 
      this.authService.login(action.email, action.password).pipe(
        map((data) => UserActions.userLoginSuccess({ data })),
        catchError((error) => of(UserActions.userLoginFailure({ error })))
      )
    )
    );
  });
}
