import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {UserInfoService} from '../user-info.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  constructor(
    public shoppingCartService: ShoppingCartService,
    private userInfoService: UserInfoService
  ) { }

  ngOnInit(): void {
    this.userInfoService.getUserFromBackend();
    setTimeout(() =>
      {
        this.shoppingCartService.getMarkedArticle(this.userInfoService.getUserId());
      },
      1000);
  }



}
