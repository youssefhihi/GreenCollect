import { User } from './../../../../model/user/user.model';
import { Store } from '@ngrx/store';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfoService } from '../../../../core/service/user-info.service';
import { UpdateProfileActions } from '../../../../state/actions/user/user.actions';
import { selectUserError, selectUserSuccess } from '../../../../state/selectors/user/user.selectors';

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

  profileImage: string = '';
  authUser : User | null = null;
  error$ = this.store.select(selectUserError);
  success$ = this.store.select(selectUserSuccess);
  formGroup = this.fb.group({
      fullName: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
      }),
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      birthday: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: this.fb.group({
        city : ['', [Validators.required, Validators.minLength(2)]],
        zipcode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      }),
      profileImage: [''],
    });

    ngOnInit() {
      this.userInfo.getAuthUser().subscribe((user) => {
        if (!user) return;
        this.formGroup.patchValue(user);
        this.authUser = user;
        this.profileImage = user.profileImage || 'assets/imgs/noImg.jpg';
      });
      
    }

 onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
        this.formGroup.patchValue({ profileImage: e.target.result }); // Save to form
      };
      reader.readAsDataURL(file); // Convert to Base64
    }
  }
  onSubmit() {
    if (this.formGroup.invalid) {
      console.log('Formulaire invalide');
      return;
    }
  
    if (!this.authUser?.id) {
      console.error('User ID is required but not found');
      return; 
    }
  
    const updatedUser: User = {
      id: this.authUser.id,
      fullName: {
        firstName: this.formGroup.value.fullName?.firstName || '',  
        lastName: this.formGroup.value.fullName?.lastName || '',    
      },
      email: this.formGroup.value.email || '', 
      birthday: this.formGroup.value.birthday || '',  
      phone: this.formGroup.value.phone || '',  
      address: {
        city: this.formGroup.value.address?.city || '', 
        zipcode: this.formGroup.value.address?.zipcode || '', 
      },
      profileImage: this.formGroup.value.profileImage || '',
      password: this.authUser.password,
      role: this.authUser.role,  
    };
  
    this.store.dispatch(UpdateProfileActions.updateProfile({ data: updatedUser }));
  }
  
}
