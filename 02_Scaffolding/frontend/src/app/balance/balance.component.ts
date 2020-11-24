import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserInfoService} from '../user-info.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  private userInfoService: UserInfoService;
  private httpClient: HttpClient;

  constructor() { }

  balance;

  ngOnInit(): void {
    this.userInfoService.checkUserStatus();
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.balance = this.userInfoService.getBalance();
  }

  sendForm(): void {
    this.httpClient.put(environment.endpointURL + 'user/profile/' + this.userInfoService.getUserId(), {
      balance: this.balance
    }).subscribe((res: any) => {
      localStorage.setItem('balance', res.balance);
    });
  }

}
