import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShoppingCartService} from '../shopping-cart.service';
import {UserInfoService} from '../user-info.service';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-page-lend',
  templateUrl: './article-page-lend.component.html',
  styleUrls: ['./article-page-lend.component.css']
})
export class ArticlePageLendComponent implements OnInit {
  newTitle;
  newPrice;
  newDescription;

  public article: any;

  constructor(
    public articleInfoService: ArticleInfoService,
    private snackBar: MatSnackBar,
    private shoppingCart: ShoppingCartService,
    public userInfoService: UserInfoService,
    private httpClient: HttpClient,
    private router: Router
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

  changeArticle(id: any): void {
    this.httpClient.put(environment.endpointURL + 'add-article/lend-product/' + id, {
      title: this.newTitle,
      price: this.newPrice,
      description: this.newDescription,
      userId: this.userInfoService.getUserId()
    }).subscribe();
    this.articleInfoService.saveSellArticleTemp(id);
    setTimeout(() =>
      {
        this.router.navigate(['/profile']);
      },
      1000);
  }
}
