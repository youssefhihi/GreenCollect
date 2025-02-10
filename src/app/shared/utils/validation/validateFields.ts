import { FormGroup } from "@angular/forms";

export function isFieldInvalid(field: string, form: FormGroup, isSubmitted: boolean): boolean {
    const control = form.get(field);
    return !!control && control.invalid && (control.dirty || control.touched || isSubmitted);
  }

  export function getErrorMessage(form: FormGroup, field: string): string | null {
    const control = form.get(field);
  
    if (!isFieldInvalid(field, form, false)) return null;
  
    if (control?.hasError('required')) {
      return `est requis.`;
    }
  
    if (control?.hasError('minlength')) {
      return `doit contenir au moins ${control.getError('minlength').requiredLength} caractères.`;
    }
  
    if (control?.hasError('pattern')) {
      return `doit être valide.`;
    }
  
    if (control?.hasError('min')) {
      return `doit être au moins ${control.errors?.['min']?.min}.`;
    }
  
    if (control?.hasError('confirmPassword')) {
      return `ne correspond pas au mot de passe.`;
    }
  
    return null;
  }
  