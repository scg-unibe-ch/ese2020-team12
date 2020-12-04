import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShoppingCartService} from '../shopping-cart.service';
import {UserInfoService} from "../user-info.service";


@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {

  public article: any;


  constructor(
    public articleInfoService: ArticleInfoService,
    private snackBar: MatSnackBar,
    private shoppingCart: ShoppingCartService,
    public userInfoService: UserInfoService
  ) {
  }

  ngOnInit(): void {
    this.article = this.articleInfoService.getArticle();
  }

  openSnackBar(message: string, action: string): void {
    this.shoppingCart.addSellProduct(this.article.sellProductId, this.userInfoService.getUserId());
    this.snackBar.open(message, action, {
      duration: 8000,
    });
  }
}
