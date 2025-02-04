import { AbstractControl, ValidatorFn } from "@angular/forms";

export function confirmPasswordValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
  
      if (control?.errors && !control.errors['confirmPassword']) {
        return null;
      }
  
      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ confirmPassword: true });
      } else {
        matchingControl?.setErrors(null);
      }
  
      return null;
    };
  }