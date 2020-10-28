import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userName = '';
  password = '';
  userId: string;

  userToken: string;
  loggedIn = false;

  secureEndpointResponse = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.checkUserStatus();
    this.getUserId();
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');
    this.userId = localStorage.getItem('userId');

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }

  login(): void {
    this.httpClient.post(environment.endpointURL + 'user/login', {
      userName: this.userName,
      password: this.password
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);
      localStorage.setItem('userId', res.user.userId);
      this.checkUserStatus();
    });
  }

  getUserId(): void {
    this.httpClient.get(environment.endpointURL + 'user/profile').subscribe((res: any) => {
      this.userId = res.userId;
    });
  }

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');

    this.checkUserStatus();
  }

  /**
   * Function to access a secure endpoint that can only be accessed by logged in users by providing their token.
   */
  accessSecuredEndpoint(): void {
    this.httpClient.get(environment.endpointURL + 'secured').subscribe((res: any) => {
      this.secureEndpointResponse = 'Successfully accessed secure endpoint. Message from server: ' + res.message;
    }, (error: any) => {
      this.secureEndpointResponse = 'Unauthorized';
    });
  }
}
