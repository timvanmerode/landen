import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function aantalPositief(): ValidatorFn {
 return (control: AbstractControl): ValidationErrors | null => {
    return control.value <= 0 ? {isNietPositief: true} : null;
 };
}