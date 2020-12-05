import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userId;

  constructor(
    public articleInfoService: ArticleInfoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.articleInfoService.getUserId();
    this.articleInfoService.saveUserLendArticle(this.userId);
    this.articleInfoService.saveUserSellArticle(this.userId);
    this.articleInfoService.saveUserServiceArticle(this.userId);
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

  deleteSell(id: any): void {
    this.articleInfoService.deleteSellProduct(id);
    setTimeout(() =>
      {
        this.ngOnInit();
      },
      750);
  }

  deleteLend(id: any): void {
    this.articleInfoService.deleteLendProduct(id);
    setTimeout(() =>
      {
        this.ngOnInit();
      },
      750);
  }

  deleteService(id: any): void {
    this.articleInfoService.deleteService(id);
    setTimeout(() =>
      {
        this.ngOnInit();
      },
      750);
  }


}
