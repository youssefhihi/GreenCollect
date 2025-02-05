import { User } from './../../../../model/user/user.model';
import { Store } from '@ngrx/store';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfoService } from '../../../../core/service/user-info.service';
import { UpdateProfileActions } from '../../../../state/actions/user/user.actions';

@Component({
  selector: 'app-update-form',
  standalone: false,
  
  templateUrl: './update-form.component.html',
  styleUrl: './update-form.component.css'
})
export class UpdateFormComponent {
  private fb = inject(FormBuilder);
  private userInfo = inject(UserInfoService);
  private store = inject(Store);
  authUser : User | null = null;
  formGroup = this.fb.group({
      fullName: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
      }),
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      birthday: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: this.fb.group({
        street: ['', [Validators.required, Validators.minLength(2)]],
        suite: ['', [Validators.required, Validators.minLength(2)]],
        city : ['', [Validators.required, Validators.minLength(2)]],
        zipcode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      }),
    });

    ngOnInit() {
      this.userInfo.getAuthUser().subscribe((user) => {
        if (!user) return;
        this.formGroup.patchValue(user);
        this.authUser = user;

      });
    }


    onSubmit() {
      if (this.formGroup.invalid) {

        return;
      }
     
  
    }
}
