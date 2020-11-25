import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { UserInfoService } from '../user-info.service';
import {ArticleInfoService} from '../article-info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  // local variables necessary for input logic
  username = '';
  password = '';

  searchTerm;

  secureEndpointResponse = '';
  constructor(
    private httpClient: HttpClient,
    public userInfoService: UserInfoService,
    public articleInfoService: ArticleInfoService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userInfoService.checkUserStatus();
  }

  login(): void {
    this.httpClient.post(environment.endpointURL + 'user/login', {
      userName: this.username,
      password: this.password
    }).subscribe((res: any) => {
      // Set user data in user service
      localStorage.setItem('userToken', res.token); // token in localstorage too
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);
      this.userInfoService.setUserToken(res.token);
      this.userInfoService.setExtendedUserInfo(res.user);
      this.userInfoService.checkUserStatus();
    });
  }

  logout(): void {
    // Remove user data from user service
    this.userInfoService.setUserToken(null);
    localStorage.removeItem('userToken');
    this.userInfoService.checkUserStatus();
  }

  accessSecuredEndpoint(): void {
    this.httpClient.get(environment.endpointURL + 'secured').subscribe((res: any) => {
      this.secureEndpointResponse = 'Successfully accessed secure endpoint. Message from server: ' + res.message;
    }, (error: any) => {
      this.secureEndpointResponse = 'Unauthorized';
    });
  }

  search(): void {
    this.articleInfoService.setSearchTerm(this.searchTerm);
    setTimeout(() =>
      {
        this.router.navigate(['/search-results']);
      },
      1000);

  }
}
