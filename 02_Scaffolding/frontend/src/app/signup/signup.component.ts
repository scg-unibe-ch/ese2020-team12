import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  signupForm;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.signupForm = this.formBuilder.group({
      name: '',
      surname: '',
      username: '',
      email: '',
      password: '',
      passwordAgain: '',
    });
  }

  ngOnInit(): void {
  }

  onSubmit(customerData): void {
    // Process checkout data here
    console.warn('Your registration has been submitted', customerData);
  }

}
