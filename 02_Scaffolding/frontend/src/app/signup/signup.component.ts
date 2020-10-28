import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {passwordValidator} from './password-validator.directive';
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
  userToken;

  loggedIn = false;

  errorMessages = {
    surname: [
      {type: 'required', message: 'Surname is required.'}
    ],

    name: [
      {type: 'required', message: 'Name is required.'}
    ],
    username: [
      {type: 'required', message: 'Username is required.'},
      {type: 'maxlength', message: 'Username is too long.'}
    ],
    email: [
      {type: 'required', message: 'Email is required.'},
      {type: 'minlength', message: 'Email length.'},
      {type: 'pattern', message: 'please enter a valid email address.'}
    ],
    postalCode: [
      {type: 'required', message: 'Postal code is required.'},
      {type: 'pattern', message: 'Postal code must consist of numbers'}
    ],
    city: [
      {type: 'required', message: 'City is required.'}
    ],

    password: [
      {type: 'required', message: 'password is required.'},
      {type: 'minlength', message: 'password length.'},
      {type: 'pattern', message: 'password must be safer'}
    ],
    passwordAgain: [
      {type: 'required', message: 'password is required.'},
      {type: 'minlength', message: 'password length.'},
      {type: 'pattern', message: 'password must be safer'}
    ],
  };

  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
  ) {
    this.signUpForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      surname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(16)
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
        Validators.required,
        Validators.pattern('[0-9]')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}')
      ])),
      passwordAgain: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])),
    }, {validators: passwordValidator});
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
  }

  sendForm(): void {
    this.httpClient.post(environment.endpointURL + 'user/signup', {
      name: this.name,
      surname: this.surname,
      userName: this.username,
      email: this.email,
      street: this.street,
      houseNumber: this.houseNumber,
      place: this.city,
      postalCode: this.postalCode,
      password: this.password
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('name', res.name);
      localStorage.setItem('surname', res.surname);
      localStorage.setItem('userName', res.userName);
      localStorage.setItem('email', res.email);
      localStorage.setItem('street', res.street);
      localStorage.setItem('houseNumber', res.houseNumber);
      localStorage.setItem('place', res.place);
      localStorage.setItem('postalCode', res.postalCode);
      localStorage.setItem('password', res.password);
      localStorage.setItem('userToken', res.token);
    });
    this.login();
  }
  login(): void {
    this.userToken = localStorage.getItem('userToken');
    this.loggedIn = !!(this.userToken);
  }
}
