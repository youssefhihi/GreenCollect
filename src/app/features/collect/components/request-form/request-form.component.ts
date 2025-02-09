import { Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WasteType } from '../../../../model/enum/wasteType';
import { getErrorMessage, isFieldInvalid } from '../../../../shared/utils/validation/validateFields';
import { Store } from '@ngrx/store';
import { UserInfoService } from '../../../../core/service/user-info.service';
import { CollectActions } from '../../../../state/actions/collect/collect.actions';
import { map } from 'rxjs';

@Component({
  selector: 'app-request-form',
  standalone: false,
  
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.css'
})
export class RequestFormComponent {
  collectForm!: FormGroup;
  wasteTypes = Object.values(WasteType); 

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userInfo = inject(UserInfoService);
  private store = inject(Store);

  isSubmitted = false;

  ngOnInit() {
    this.userInfo.getAuthUser().subscribe((user) => {
      this.collectForm = this.fb.group({
        wasteType: ['', Validators.required],
        estimatedWeight: [1000, [Validators.required, Validators.min(1000)]],
        address: this.fb.group({
          city: ['', Validators.required],
          zipecode: ['', Validators.required]
        }),
        userId: [user.id],
        date: ['', Validators.required],
        timeSlot: ['', Validators.required],
        photos: this.fb.array([], [this.validatePhotos()]),
        note: [''],
        status: ['pending']
      });
    });
  }
  

  validatePhotos(): ValidatorFn {
    return (control: AbstractControl): { required: boolean } | null => {
      if (control instanceof FormArray) {
        return control.length > 0 ? null : { required: true };
      }
      return null;
    };
  }
  
  get photos() {
    return this.collectForm.get('photos') as FormArray;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photos.push(this.fb.control(reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto(index: number) {
    this.photos.removeAt(index);
  }

  onSubmit() {
    this.isSubmitted = true;
    
    if (this.collectForm.invalid) {
      console.log('❌ Formulaire invalide. Champs en erreur :');
      this.logInvalidControls(this.collectForm);
      return;
    }
      this.store.dispatch(CollectActions.collectAddCollects({ data: this.collectForm.value }));
  
    console.log('✅ Formulaire valide', this.collectForm.value);
  }
  
  private logInvalidControls(form: FormGroup, parentKey = '') {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
  
      if (control instanceof FormGroup) {
        this.logInvalidControls(control, fullKey); // Vérifie les sous-groupes
      } else if (control instanceof FormArray) {
        if (control.invalid) {
          console.log(`⛔ ${fullKey} (FormArray) est invalide :`, control.errors);
        }
        control.controls.forEach((ctrl, index) => {
          if (ctrl.invalid) {
            console.log(`⛔ ${fullKey}[${index}] est invalide :`, ctrl.errors);
          }
        });
      } else if (control?.invalid) {
        console.log(`⛔ ${fullKey} est invalide :`, control.errors);
      }
    });
  }
  
  
 
  isFieldValid(field: string): boolean {
    return isFieldInvalid(field, this.collectForm, this.isSubmitted);
  }

  getErrorMessage(field: string): string | null{
    return getErrorMessage(this.collectForm, field);
  }
}