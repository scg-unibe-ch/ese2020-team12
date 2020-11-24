import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lendproduct-page',
  templateUrl: './lendproduct-page.component.html',
  styleUrls: ['./lendproduct-page.component.css']
})
export class LendproductPageComponent implements OnInit {
  articleIds: number[];

  articles: any;

  constructor(
    public articleInfoService: ArticleInfoService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.articleInfoService.saveAllLendArticles();
  }

  moreInfos(id: number): void{
    this.articleInfoService.saveLendArticleTemp(id);
    setTimeout(() =>
      {
        this.router.navigate(['/article-page-lend']);
      },
      1000);
  }

}
