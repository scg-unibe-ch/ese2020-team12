import { Directive } from '@angular/core';
import {AbstractControl, ValidatorFn} from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]'
})
export class PasswordValidatorDirective {

  constructor() { }
}

export function passwordValidator(password: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const allowed = (password === control.value);
    return allowed ? {forbiddenName: {value: control.value}} : null;
  };
}
