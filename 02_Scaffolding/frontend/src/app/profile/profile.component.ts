import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserInfoService} from '../user-info.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userToken: string;
  loggedIn = false;

  name;
  surname;
  username;
  email;
  street;
  houseNumber;
  place;
  postalCode;
  password;

  ngOnInit(): void {
    this.userInfoService.checkUserStatus();
  }

  /*
  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.username = localStorage.getItem('userName');
    this.email = localStorage.getItem('email');
    this.name = localStorage.getItem('name');
    this.surname = localStorage.getItem('surname');
    this.street = localStorage.getItem('street');
    this.houseNumber = localStorage.getItem('houseNumber');
    this.postalCode = localStorage.getItem('postalCode');
    this.place = localStorage.getItem('place');

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }
   */

  editProfileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    public userInfoService: UserInfoService
  ) {
    this.editProfileForm = this.formBuilder.group({
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
      place: new FormControl(''),
      postalCode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]')
      ]))
    });
  }

  sendForm(): void {
    this.httpClient.put(environment.endpointURL + 'user/profile', {
      name: this.name,
      surname: this.surname,
      userName: this.username,
      email: this.email,
      street: this.street,
      houseNumber: this.houseNumber,
      place: this.place,
      postalCode: this.postalCode,
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
    });
  }
}
