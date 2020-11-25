import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserInfoService} from '../user-info.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  balance: number;
  private oldBalance: number;
  private userId: number;

  constructor(
    private userInfoService: UserInfoService,
    private httpClient: HttpClient,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.userInfoService.checkUserStatus();
    this.oldBalance = this.userInfoService.getBalance();
    this.userId = this.userInfoService.getUserId();

    /* setTimeout(() =>
      {
        console.log(this.oldBalance);
        // this.router.navigate(['/']);
      },
      1000); */

  }


  sendForm(): void {
    const newBalance = Number(this.oldBalance) + Number(this.balance);
    this.httpClient.put(environment.endpointURL + 'user/profile/' + this.userId , {
      balance: newBalance
    }).subscribe((res: any) => {
    });
    setTimeout(() =>
      {
        this.userInfoService.getUserFromBackend();
        this.router.navigate(['/']);
      },
      1000);
  }

}
