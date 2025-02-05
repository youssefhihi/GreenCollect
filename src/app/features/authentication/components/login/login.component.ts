import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../../state/actions/user/user.actions';
import { selectUser, selectUserError } from '../../../../state/selectors/user/user.selectors';
import { getErrorMessage, isFieldInvalid } from '../../../../shared/utils/validation/validateFields';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);


  error$ = this.store.select(selectUserError);

  user$ = this.store.select(selectUser).subscribe(
    (user) => {
      if (user) {
        console.log('User', user);
      }
    }
  );

  loginForm: FormGroup = this.fb.group({
    email:['', Validators.required],
    password:['', Validators.required]
  })

  isSubmitted = false;

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.store.dispatch(UserActions.userLogin({ email, password }));

  }


  isFieldInvalid(field: string): boolean {
    return isFieldInvalid(field, this.loginForm, this.isSubmitted);
  }
  

  getErrorMessage(field: string): string | null {
   return getErrorMessage(this.loginForm, field);
  }
}
