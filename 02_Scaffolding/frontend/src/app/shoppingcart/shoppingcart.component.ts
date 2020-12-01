import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {UserInfoService} from '../user-info.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArticleInfoService} from '../article-info.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

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
  articlesId;
  articles = [];
  articleSellList = [];
  articleLendList = [];
  articleServList = [];
  userId;


  constructor(
    public shoppingCartService: ShoppingCartService,
    private userInfoService: UserInfoService,
    private formBuilder: FormBuilder,
    public articleInfoService: ArticleInfoService,
    private router: Router,
    private httpClient: HttpClient
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
    setTimeout(() =>
      {
        this.userId = this.userInfoService.getUserId();
        this.articlesId = this.shoppingCartService.getProductIds();
        this.saveArticle(this.articlesId);
        this.shoppingCartService.saveSellArticle(this.articleSellList);
        this.shoppingCartService.saveLendArticle(this.articleLendList);
        this.shoppingCartService.saveServiceArticle(this.articleServList);
      },
      1500);
  }

  changeOtherAddress(): void {
    this.otherAddress = true;
  }

  changeOtherAddress2(): void {
    this.otherAddress = false;
  }

  saveArticle(articlesId: any): void {
    this.articleSellList = [];
    this.articleLendList = [];
    this.articleServList = [];
    for (const id of articlesId) {
        if (id.sellProductId !== null) {
          this.articleSellList.push(id.sellProductId);
        }
        if (id.lendProductId !== null) {
          this.articleLendList.push(id.lendProductId);
        }
        if (id.serviceId !== null) {
          this.articleServList.push(id.serviceId);
        }
    }
    }

  moreSellInfos(id: number): void{
    this.articleInfoService.saveSellArticleTemp(id);
    setTimeout(() =>
      {
        this.router.navigate(['/article-page']);
      },
      1000);
  }
  moreLendInfos(id: number): void{
    this.articleInfoService.saveLendArticleTemp(id);
    setTimeout(() =>
      {
        this.router.navigate(['/article-page-lend']);
      },
      1000);
  }
  moreServiceInfos(id: number): void{
    this.articleInfoService.saveServiceArticleTemp(id);
    setTimeout(() =>
      {
        this.router.navigate(['/article-page-service']);
      },
      1000);
  }

  sellRemove(id: any): void {
    console.log('im in');
    this.httpClient.delete(environment.endpointURL + 'shopping-cart/delete/sell/' + this.userId + '/' + id)
      .subscribe();
    setTimeout(() =>
      {
        window.location.reload();
      },
      1000);
  }

  lendRemove(id: any): void {
    this.httpClient.delete(environment.endpointURL + 'shopping-cart/delete/lend/' + this.userId + '/' + id)
      .subscribe();
    setTimeout(() =>
      {
        window.location.reload();
      },
      1000);
  }

  serviceRemove(id: any): void {
    this.httpClient.delete(environment.endpointURL + 'shopping-cart/delete/service/' + this.userId + '/' + id)
      .subscribe();
    setTimeout(() =>
      {
        window.location.reload();
      },
      1000);
  }

  totalPayment(): any {

  }
}
