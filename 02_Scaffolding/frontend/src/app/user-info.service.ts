/* tslint:disable:no-trailing-whitespace */

import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  // Basic UserInfo
  isLoggedIn: boolean;
  username: string;
  password: string;
  userToken: string;
  userId: any;

  // Extended UserInfo


  // Getters and Setters
  getLogin(): boolean {
    return this.isLoggedIn;
  }
  setLogin(loginStatus: boolean): void {
    this.isLoggedIn = loginStatus;
  }

  getUsername(): string {
    return this.username;
  }
  setUsername(username: string): void {
    this.username = username;
  }

  /*
  // Storage of password in user service is not necessary / insecure
  getPassword(): string {
    return this.password;
  }
  setPassword(password: string): void {
    this.password = password;
  }
   */

  getUserToken(): string {
    return this.userToken;
  }
  setUserToken(userToken: string): void {
    this.userToken = userToken;
  }

  getUserId(): any {
    return this.userId;
  }
  setUserId(userId: any): void {
    this.userId = userId;
  }

  constructor(
    private httpClient: HttpClient
  ) {
    this.isLoggedIn = false;
    this.username = '';
  }

}

/*
  // previous variables (delete as soon as not needed anymore)
  username: string;
  userToken: any; // change to correct type
  password: string;
  userId: string;

  user: any;

  email: string;
  name: string;
  surname: string;
  street: string;
  houseNumber: number;
  postalCode: number;
  place: string;
   */

/*  Old Methods (delete as soon as not needed anymore)
  getUser(): string {
    this.httpClient.get(environment.endpointURL + 'user/profile/' + this.userId)
      .subscribe((res: any ) => {
        this.user = res;
      });
    return this.user;
  }

  isLoggedIn(): boolean {
    // code
    return true;
  }

  getUserId(): string {
    this.userId = localStorage.getItem('userId');
    return this.userId;
  }

  getDataFromBackend(): void {
    // if (this.isLoggedIn()){
      this.httpClient.get(environment.endpointURL + 'user/profile/' + this.getUserId())
        .subscribe((res: any ) => {
          this.user = res.user;
        });
      // für aues angere müessmer ds de ono
      this.httpClient.get(environment.endpointURL + 'user/profile/' + 'pockel')
        .subscribe((res: any ) => {
          this.username = res.pockel.username;
      });
    // }
  }
  getUserName(): string {
    return this.username;
  }

  getEmail(): string {
    this.getDataFromBackend();
    return this.user.email;
  }
   */

/*
  // Where do i need to put this? How do i need to write this? (30.10.20 -mauri)
  getUserId(): void {
    this.httpClient.get(environment.endpointURL + 'user/profile').subscribe((res: any) => { this.isLoggedIn = res.loggedIn; });
  }
   */

/*
 this.getUserDate();
    console.log(this.username,
      this.password,
      this.email,
      this.name,
      this.surname,
      this.street,
      this.houseNumber,
      this.postalCode,
      this.place);
 */

