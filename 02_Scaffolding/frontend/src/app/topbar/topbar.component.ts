import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  // local variables necessary for input logic
  username = '';
  password = '';

  secureEndpointResponse = '';
  constructor(
    private httpClient: HttpClient,
    public userInfoService: UserInfoService
  ) {
  }

  ngOnInit(): void {
    // this.userInfoService.checkUserStatus();
  }

  /*
  checkUserStatus(): void {
    // Set boolean whether a user is logged in or not
    this.userInfoService.setLogin(!!(this.userInfoService.getUserToken()));
  }
   */

  login(): void {
    this.httpClient.post(environment.endpointURL + 'user/login', {
      userName: this.username,
      password: this.password
    }).subscribe((res: any) => {
      // Set user data in user service
      this.userInfoService.setUserToken(res.token); // token in localstorage too
      this.userInfoService.setUsername(res.user.userName);
      this.userInfoService.setUserId(res.user.userId);
      this.userInfoService.setEmail(res.user.email);
      // get other userInfo from backend the following way:
      // this.userInfoService.set[Variable-Name](res.user.[Variable-Name])
      this.userInfoService.checkUserStatus();
    });
  }

  logout(): void {
    // Remove user data from user service
    this.userInfoService.setUserToken(null);
    this.userInfoService.checkUserStatus();
  }

  accessSecuredEndpoint(): void {
    this.httpClient.get(environment.endpointURL + 'secured').subscribe((res: any) => {
      this.secureEndpointResponse = 'Successfully accessed secure endpoint. Message from server: ' + res.message;
    }, (error: any) => {
      this.secureEndpointResponse = 'Unauthorized';
    });
  }

}
