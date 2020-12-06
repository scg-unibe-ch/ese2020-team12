import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShoppingCartService} from '../shopping-cart.service';
import {UserInfoService} from '../user-info.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-page-service',
  templateUrl: './article-page-service.component.html',
  styleUrls: ['./article-page-service.component.css']
})
export class ArticlePageServiceComponent implements OnInit {
  newTitle;
  newPrice;
  newDescription;
  expenses;
  expCost;

  public article: any;

  constructor(
    public articleInfoService: ArticleInfoService,
    private snackBar: MatSnackBar,
    private shoppingCart: ShoppingCartService,
    public userInfoService: UserInfoService,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.article = this.articleInfoService.getArticle();
  }

  openSnackBar(message: string, action: string): void{
    this.shoppingCart.addServiceProduct(this.article.serviceId, this.userInfoService.getUserId());
    this.snackBar.open(message, action, {
      duration: 8000,
    });
  }

  changeArticle(id: any): void {
    this.httpClient.put(environment.endpointURL + 'add-article/provide-service/' + id, {
      title: this.newTitle,
      price: this.newPrice,
      description: this.newDescription,
      expenses: this.expenses,
      expCost: this.expCost,
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
