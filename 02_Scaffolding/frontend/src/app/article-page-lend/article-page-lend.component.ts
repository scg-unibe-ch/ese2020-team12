import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShoppingCartService} from '../shopping-cart.service';
import {UserInfoService} from '../user-info.service';

@Component({
  selector: 'app-article-page-lend',
  templateUrl: './article-page-lend.component.html',
  styleUrls: ['./article-page-lend.component.css']
})
export class ArticlePageLendComponent implements OnInit {

  public article: any;

  constructor(
    public articleInfoService: ArticleInfoService,
    private snackBar: MatSnackBar,
    private shoppingCart: ShoppingCartService,
    public userInfoService: UserInfoService
  ) {
    this.article = this.articleInfoService.getArticle();
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string): void{
    this.shoppingCart.addLendProduct(this.article.lendProductId, this.userInfoService.getUserId());
    this.snackBar.open(message, action, {
      duration: 8000,
    });
  }
}
