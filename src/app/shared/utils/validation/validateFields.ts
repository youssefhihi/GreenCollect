import { FormGroup } from "@angular/forms";

export function isFieldInvalid(field: string, form: FormGroup, isSubmitted: boolean): boolean {
    const control = form.get(field);
    return !!control && control.invalid && (control.dirty || control.touched || isSubmitted);
  }

  export function getErrorMessage(form: FormGroup, field: string): string | null {
    const control = form.get(field);
    
    if(!isFieldInvalid(field, form, false)) return null;

    if (control?.hasError('required')) {
      return `is required.`;
    }

    if (control?.hasError('minlength')) 
      return `must be at least ${control.getError('minlength').requiredLength} characters.`;

    if (control?.hasError('pattern'))
      return `must be valid.`;
    if (control?.hasError('min'))   return `doit être au moins ${control.errors?.['min']?.min}.`;
    if (control?.hasError('confirmPassword')) 
      return 'do not match with password.';
    return null;
  }