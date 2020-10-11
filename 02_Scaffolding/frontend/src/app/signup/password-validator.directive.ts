import { Directive } from '@angular/core';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]'
})
export class PasswordValidatorDirective {
  constructor() { }
}

/** A password must match the second password */
export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const passwordAgain = control.get('passwordAgain');

  return password && passwordAgain && password.value !== passwordAgain.value ? { differentPassword: true } : null;
};
