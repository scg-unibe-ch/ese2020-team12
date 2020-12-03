import { Component, OnInit } from '@angular/core';
import {UserInfoService} from '../user-info.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ArticleInfoService} from '../article-info.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
  users: any;

  constructor(
    private userInfoService: UserInfoService,
    private httpClient: HttpClient,
    private articleInfoService: ArticleInfoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userInfoService.getUserFromBackend();
    this.saveUsers();
  }

  saveUsers(): void {
    this.httpClient.get(environment.endpointURL + 'user/admin/users')
      .subscribe(res => {
        this.users = res;
      });
  }

  deleteUser(id: any): void {
    this.userInfoService.deleteUser(id);
    setTimeout(() =>
      {
        window.location.reload();
      },
      1000);
  }

  moreInfo(id: any): void {
    this.articleInfoService.setUserId(id);
    setTimeout(() =>
      {
        this.router.navigate(['/user-info']);
      },
      1000);
  }


}
