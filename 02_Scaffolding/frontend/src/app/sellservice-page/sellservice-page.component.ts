import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sellservice-page',
  templateUrl: './sellservice-page.component.html',
  styleUrls: ['./sellservice-page.component.css']
})
export class SellservicePageComponent implements OnInit {

  articleIds: number[];
  articles: any;

  constructor(
    public articleInfoService: ArticleInfoService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.articleInfoService.saveAllServiceArticles();
  }

  moreInfos(id: number): void{
    this.articleInfoService.saveServiceArticleTemp(id);
    setTimeout(() =>
      {
        this.router.navigate(['/article-page-service']);
      },
      1000);
  }

}
