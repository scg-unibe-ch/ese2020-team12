import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShoppingCartService} from '../shopping-cart.service';
import {UserInfoService} from '../user-info.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';


@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {
  newTitle;
  newPrice;
  newDescription;
  newSpec;


  public article: any;


  constructor(
    public articleInfoService: ArticleInfoService,
    private snackBar: MatSnackBar,
    private shoppingCart: ShoppingCartService,
    public userInfoService: UserInfoService,
    private httpClient: HttpClient,
    private router: Router
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

  // /add-article/sell-product
  changeArticle(id: any): void {
    this.httpClient.put(environment.endpointURL + 'add-article/sell-product/' + id, {
      title: this.newTitle,
      price: this.newPrice,
      description: this.newDescription,
      delSpec: this.newSpec,
      userId: this.userInfoService.getUserId()
    }).subscribe();
    this.articleInfoService.saveSellArticleTemp(id);
    setTimeout(() =>
      {
        this.router.navigate(['/profile']);
      },
      1000);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  textOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)){
      return false;
    }
    return true;
  }
}
