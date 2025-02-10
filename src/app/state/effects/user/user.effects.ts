import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UpdateProfileActions, UserActions } from '../../actions/user/user.actions';
import { catchError, map, merge, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../../../features/authentication/services/authentication/auth.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../core/service/user-info.service';



@Injectable()
export class UserEffects {

  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private userService = inject(UserInfoService);
  private router = inject(Router);



    login$ = createEffect(() => {
      return this.actions$.pipe(
      ofType(UserActions.userLogin),
      tap((action) => console.log('User login action', action)),
      mergeMap((action) => 
        this.authService.login(action.email, action.password).pipe(
          map((data) => {
              this.router.navigate(['/']); 
               return UserActions.userLoginSuccess({ data });
            }),
          catchError((error) => of(UserActions.userLoginFailure({ error })))
        )
      )
      );
    });

  register$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(UserActions.userRegister),
    tap((action) => console.log('User register action', action)),
    mergeMap((action) => 
      this.authService.register(action.user).pipe(
        map((success) => UserActions.userRegisterSuccess({ success })),
        catchError((error) => of(UserActions.userRegisterFailure({ error })))
      )
    )
    );
  });

  updateProfile$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(UpdateProfileActions.updateProfile),
    tap((action) => console.log('Update profile action', action)),  
    mergeMap((action) => 
      this.userService.updateProfile(action.data).pipe(
        map((data) => UpdateProfileActions.updateProfileSuccess({ data })),
        catchError((error) => of(UpdateProfileActions.updateProfileFailure({ error })))
      )
    )
    );
  });
}
