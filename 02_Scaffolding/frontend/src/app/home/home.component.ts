import { Component, OnInit } from '@angular/core';
import {UserInfoService} from '../user-info.service';
import {ArticleInfoService} from '../article-info.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // articleIds: any;

  constructor(
    public articleInfoService: ArticleInfoService,
    public router: Router
  ) {
  }



  ngOnInit(): void {
    this.articleInfoService.saveAllLendArticles();
    this.articleInfoService.saveAllServiceArticles();
    this.articleInfoService.saveAllSellArticles();
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

}
