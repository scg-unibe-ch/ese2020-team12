import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserInfoService} from '../user-info.service';
import {environment} from '../../environments/environment';
import {url} from 'inspector';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  myForm: FormGroup;
  password;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    public userInfoService: UserInfoService
  ) { }

  ngOnInit(): void {
    this.userInfoService.getUserFromBackend();
    this.myForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}$'),
      ] ],
    });
  }

  changePassword(): void {
    this.httpClient.put(environment.endpointURL + 'user/profile/password/' + this.userInfoService.getUserId(), {
      password: this.password
    }).subscribe();
    setTimeout(() =>
      {
        this.router.navigate(['/profile']);
      },
      1000);
  }
}
