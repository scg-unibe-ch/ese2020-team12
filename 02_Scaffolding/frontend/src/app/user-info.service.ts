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
  user: any;
  email: string;
  name: string;
  surname: string;
  street: string;
  houseNumber: number;
  postalCode: number;
  place: string;
  balance: number;


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


  getUserToken(): string {
    return this.userToken;
  }
  setUserToken(userToken: string): void {
    this.userToken = userToken;
  }


  checkUserToken(): void {
    if (localStorage.getItem('userToken')) {
      this.getUserFromBackend();
    }
  }

  getUserFromBackend(): void {
    this.httpClient.post(environment.endpointURL + 'user/login', {
      userName: localStorage.getItem('username'),
      password: localStorage.getItem('password')
    }).subscribe((res: any) => {
      // Set user data in user service
      this.setUserToken(res.token);
      this.setExtendedUserInfo(res.user);
      this.checkUserStatus();
    });
  }

  getUserId(): any {
    return this.userId;
  }
  setUserId(userId: any): void {
    this.userId = userId;
  }

  getUser(): any {
    if (this.getLogin()) {
      this.httpClient.get(environment.endpointURL + 'user/profile/' + this.getUserId())
        .subscribe((res: any ) => {
          this.user = res.user;
        });
    }
    return this.user;
  }

  setExtendedUserInfo(user: any): void {
    this.username = user.userName;
    this.userId = user.userId;
    this.email = user.email;
    this.name = user.name;
    this.surname = user.surname;
    this.street = user.houseNumber;
    this.houseNumber = user.houseNumber;
    this.postalCode = user.postalCode;
    this.place = user.place;
    this.balance = user.balance;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getSurname(): string {
    return this.surname;
  }

  getStreet(): string {
    return this.street;
  }

  getHouseNumber(): number {
    return this.houseNumber;
  }

  getPostalCode(): number {
    return this.postalCode;
  }

  getPlace(): string {
    return this.place;
  }

  getBalance(): number {
    return this.balance;
  }

  constructor(
    private httpClient: HttpClient
  ) {
    this.isLoggedIn = false;
    this.username = '';
    this.user = null;
  }


  checkUserStatus(): void {
    this.setLogin(!!(this.getUserToken()));
  }

  deleteUser(id: any): void {
    this.httpClient.delete(environment.endpointURL + 'user/' + id)
      .subscribe();
  }


}


