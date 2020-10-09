import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  name;
  surname;
  username;
  email;
  street;
  houseNumber;
  city;
  postalCode;
  password;
  passwordAgain;

  signUpForm = this.formBuilder.group({
  name: new FormControl('', Validators.compose([
    Validators.required
  ])),
  surname: new FormControl('', Validators.compose([
    Validators.required
  ])),
  username: new FormControl('', Validators.compose([
    Validators.required
  ])),
  email: new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(30),
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
  ])),
  street: new FormControl(''),
  houseNumber: new FormControl(''),
  city: new FormControl(''),
  postalCode: new FormControl('', Validators.compose([
    Validators.required
  ])),
  password: new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(8),
  ])),
  passwordAgain: new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(8),
    // custom validator
  ])),
  });

  errorMessages = {
    surname: [
      { type: 'required', message: 'Surname is required.' }
    ],

    name: [
      { type: 'required', message: 'Name is required.' }
    ],
    username: [
      { type: 'required', message: 'Username is required.' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email length.' },
      { type: 'maxlength', message: 'Email length.' },
      { type: 'pattern', message: 'please enter a valid email address.' }
    ],
    postalCode: [
      { type: 'required', message: 'Postal code is required.' }
    ],
    city: [
      {type: 'required', message: 'City is required.'}
    ],

    password: [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
    passwordAgain: [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.sendForm();
    }
    else {
      console.log('not submitted');
    }
  }

  sendForm(): void {
    this.httpClient.post(environment.endpointURL + 'user/signup', {
      name: this.signUpForm.get('name'),
      surname: this.signUpForm.get('surname'),
      userName: this.signUpForm.get('userName'),
      email: this.signUpForm.get('email'),
      street: this.signUpForm.get('street'),
      houseNumber: this.signUpForm.get('houseNumber'),
      city: this.signUpForm.get('city'),
      postalCode: this.signUpForm.get('postalCode'),
      password: this.signUpForm.get('password')
    })
      .subscribe((res: Response) => {
        localStorage.setItem('name', this.name);
        localStorage.setItem('surname', this.surname);
        localStorage.setItem('userName', this.username);
        localStorage.setItem('email', this.email);
        localStorage.setItem('street', this.street);
        localStorage.setItem('city', this.city);
        localStorage.setItem('postalCode', this.postalCode);
        localStorage.setItem('password', this.password);
        localStorage.setItem('houseNumber', this.houseNumber);
      });
  }

  // a validator that is used at passwordAgain to check whether it's the same value as in password
  // not working properly yet (ask mauri)
  passwordValidator(control: AbstractControl): {[key: string]: boolean} | null{
    if (control.value === this.password.value){
      return { passwordValidity: true};
    }
    return null;
  }




}
