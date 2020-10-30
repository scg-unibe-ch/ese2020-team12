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

  // Observables Sources
  isLoggedInSource = new Subject<boolean>();
  usernameSource = new Subject<string>();

  // Observable Streams
  isLoggedIn$ = this.isLoggedInSource.asObservable();
  username$ = this.usernameSource.asObservable();

  // Getters
  getIsLoggedIn(): boolean{ return this.isLoggedIn; }
  getUsername(): string{ return this.username; }

  constructor(
    private httpClient: HttpClient
  ) {
    // Observers
    this.isLoggedIn$.subscribe(res => this.isLoggedIn = res);
    this.username$.subscribe(res => this.username = res);
  }

  // Where do i need to put this? How do i need to write this? (30.10.20 -mauri)
  getUserId(): void {
    this.httpClient.get(environment.endpointURL + 'user/profile').subscribe((res: any) => {
      this.isLoggedIn = res.loggedIn;
    });
  }

}
