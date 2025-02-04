import { Image } from './../../../../../../node_modules/lightningcss/node/ast.d';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUserError, selectUserSuccess } from '../../../../state/selectors/user/user.selectors';
import { UserActions } from '../../../../state/actions/user/user.actions';
import { confirmPasswordValidator } from '../../../../shared/utils/validation/confirmPasswordValidation';
import { User } from '../../../../model/user/user.model';
import { UserType } from '../../../../model/enum/userType.enum';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 private fb = inject(FormBuilder);
  private store = inject(Store);

  error$ = this.store.select(selectUserError);
  success$ = this.store.select(selectUserSuccess);

  registerForm: FormGroup = this.fb.group({
    fullName: this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
    }),
    birthday: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    address: ['', [Validators.required, Validators.minLength(2)]],
    city: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },{
      validators: confirmPasswordValidator('password', 'confirmPassword')
  });

  isSubmitted = false;

  onSubmit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const user:User = this.registerForm.value;
    user.role = UserType.CLIENT;
    this.store.dispatch(UserActions.userRegister({user}));    
  }


}
