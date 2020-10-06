import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    this.httpClient.post(environment.endpointURL + 'user/register', {
      name: this.name,
      surname: this.surname,
      userName: this.userName,
      email: this.email,
      password: this.password
    }).subscribe((res: any) => {
      localStorage.setItem('name', res.user.name);
      localStorage.setItem('surname', res.user.surname);
      localStorage.setItem('userName', res.user.userName);
      localStorage.setItem('email', res.user.email);
      localStorage.setItem('password', res.user.password);
    });
  }
}
