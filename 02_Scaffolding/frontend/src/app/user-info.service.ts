
import { Injectable } from '@angular/core';
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
  userId: string;
  user: any;

  email: string;
  name: string;
  surname: string;
  street: string;
  houseNumber: number;
  postalCode: number;
  place: string;

  getUser(): void {
    this.httpClient.get(environment.endpointURL + 'user/profile/' + this.userId)
      .subscribe((res: any ) => {
        this.user = res;
      });
  }


  constructor(
    private httpClient: HttpClient
  ) {
    this.getUser();
    console.log(this.user);
  }

  // Where do i need to put this? How do i need to write this? (30.10.20 -mauri)
  getUserId(): void {
    this.httpClient.get(environment.endpointURL + 'user/profile').subscribe((res: any) => { this.isLoggedIn = res.loggedIn; });
  }

}

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
