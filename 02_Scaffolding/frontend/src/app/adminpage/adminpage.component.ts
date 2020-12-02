import { Component, OnInit } from '@angular/core';
import {UserInfoService} from '../user-info.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  constructor(
    private userInfoService: UserInfoService
  ) { }

  ngOnInit(): void {
  }

}
