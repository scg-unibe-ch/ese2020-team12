import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserInfoService} from '../user-info.service';



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
  balance = 0;

  loggedIn = false;

  myForm: FormGroup;



  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    public userInfoService: UserInfoService
  )   {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [
        Validators.required
      ] ],
      surname: ['', [
        Validators.required
      ] ],
      username: ['', [
        Validators.required
      ] ],
      email: ['', [
        Validators.required,
        Validators.email
      ] ],
      street: ['', [
        Validators.required
      ] ],
      houseNumber: ['', [
        Validators.required
      ] ],
      city: ['', [
        Validators.required
      ] ],
      postalCode: ['', [
        Validators.required
      ] ],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]$'),
        Validators.minLength(8)
      ] ],
      passwordAgain: ['', [
        Validators.required
      ] ],
      agree: [false, [
        Validators.requiredTrue      ]]
    });
    this.myForm.valueChanges.subscribe(console.log);
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
      password: this.password,
      balance: this.balance
    }).subscribe((res: any) => {
      this.httpClient.post(environment.endpointURL + 'user/login', {
        userName: this.username,
        password: this.password
      }).subscribe((lol: any) => {
        console.log('test1');
        // Set user data in user service
        localStorage.setItem('userToken', lol.token); // token in localstorage too
        localStorage.setItem('username', this.username);
        localStorage.setItem('password', this.password);
        this.userInfoService.setUserToken(lol.token);
        this.userInfoService.setExtendedUserInfo(lol.user);
        this.userInfoService.checkUserStatus();
      });
    });
    setTimeout(() =>
      {
        this.router.navigate(['/']);
      },
      1000);
  }
}

