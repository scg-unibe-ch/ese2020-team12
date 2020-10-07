import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})



export class SignupComponent implements OnInit {

  signupForm;
  name: '';
  surname: '';
  userName: '';
  email: '';
  password: '';
  street: '';
  houseNumber: number;
  place: '';
  postalCode: number;


  userToken: string;
  loggedIn = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    this.signupForm = this.formBuilder.group({
    });
  }

  ngOnInit(): void {
  }

  onSubmit(customerData): void {
    // Process checkout data here
    console.warn('Your registration has been submitted', customerData);

  }


  registration(): void {
    console.log('you pressed the button');
    this.httpClient.post(environment.endpointURL + 'user/signup', {
      name: this.name,
      surname: this.surname,
      userName: this.userName,
      email: this.email,
      street: this.street,
      houseNumber: this.houseNumber,
      place: this.place,
      postalCode: this.postalCode,
      password: this.password
    }).subscribe((res: any) => {
        console.log('---- req gugus azeige-------------');
        console.log('name: ' + res.body.name);
        console.log('surname: ' + res.body.surname);
        console.log('username: ' + res.body.username);
        console.log('email: ' + res.body.email);
        console.log('street: ' + res.body.street);
        console.log('houseNumber: ' + res.body.houseNumber);
        console.log('place: ' + res.body.place);
        console.log('postalCode:' + res.body.postalCode);
        console.log('password:' + res.body.password);
        console.log('---- req gugus fertig-------------');
        localStorage.setItem('name', res.signup.name);
        localStorage.setItem('surname', res.signup.surname);
        localStorage.setItem('userName', res.signup.userName);
        localStorage.setItem('email', res.signup.email);
        localStorage.setItem('street', res.signup.street);
        localStorage.setItem('houseNumber', res.signup.houseNumber);
        localStorage.setItem('place', res.signup.place);
        localStorage.setItem('postalCode', res.signup.postalCode);
    }
    );
  }
}
