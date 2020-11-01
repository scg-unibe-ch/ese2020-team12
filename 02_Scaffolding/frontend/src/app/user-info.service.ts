/* tslint:disable */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  // Variables
  isLoggedIn: boolean;

  username: string;
  userToken: any; // change to correct type
  password: string;

  email: string;
  name: string;
  surname: string;
  street: string;
  houseNumber: number;
  postalCode: number;
  place: string;

  // Profile Stream
  profile$ = this.httpClient.get(environment.endpointURL + 'user/profile');

  // Getters
  getIsLoggedIn(): boolean{ return this.isLoggedIn; }
  getUsername(): string{ return this.username; }
  getUserToken(): any{ return this.userToken; }
  getPassword(): string{ return this.password; }
  getEmail(): string{ return this.email; }
  getName(): string{ return this.name; }
  getSurname(): string{ return this.surname; }
  getStreet(): string{ return this.street; }
  getHouseNumber(): number{ return this.houseNumber; }
  getPostalCode(): number{ return this.postalCode; }
  getPlace(): string{ return this.place; }

  constructor(
    private httpClient: HttpClient
  ) {
    // Observers
    this.profile$.subscribe((res: any) => this.isLoggedIn = res.loggedIn);
    // does res.username needs camelcase?
    this.profile$.subscribe((res: any) => this.username = res.username);
    this.profile$.subscribe((res: any) => this.userToken = res.userToken);
    this.profile$.subscribe((res: any) => this.password = res.password);

    this.profile$.subscribe((res: any) => this.email = res.email);
    this.profile$.subscribe((res: any) => this.name = res.name);
    this.profile$.subscribe((res: any) => this.street = res.street);
    this.profile$.subscribe((res: any) => this.houseNumber = res.houseNumber);
    this.profile$.subscribe((res: any) => this.postalCode = res.postalCode);
    this.profile$.subscribe((res: any) => this.place = res.place);

  }

  // Where do i need to put this? How do i need to write this? (30.10.20 -mauri)
  getUserId(): void {
    this.httpClient.get(environment.endpointURL + 'user/profile').subscribe((res: any) => { this.isLoggedIn = res.loggedIn; });
  }

}
