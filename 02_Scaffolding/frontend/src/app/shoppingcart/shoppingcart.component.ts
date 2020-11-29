import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {UserInfoService} from '../user-info.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  otherAddress: boolean;
  isOptional = false;

  constructor(
    public shoppingCartService: ShoppingCartService,
    private userInfoService: UserInfoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ''
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ''
    });
    this.thirdFormGroup = this.formBuilder.group({
      secondCtrl: ''
    });
    this.userInfoService.getUserFromBackend();
    setTimeout(() =>
      {
        this.shoppingCartService.getMarkedArticle(this.userInfoService.getUserId());
      },
      1000);
  }

  changeOtherAddress(): void {
    this.otherAddress = true;
  }

  changeOtherAddress2(): void {
    this.otherAddress = false;
  }

}
