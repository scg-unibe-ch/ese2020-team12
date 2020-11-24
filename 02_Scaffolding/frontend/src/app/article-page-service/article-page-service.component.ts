import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';

@Component({
  selector: 'app-article-page-service',
  templateUrl: './article-page-service.component.html',
  styleUrls: ['./article-page-service.component.css']
})
export class ArticlePageServiceComponent implements OnInit {

  public article: any;

  constructor(
    public articleInfoService: ArticleInfoService,
  ) { }

  ngOnInit(): void {
    this.article = this.articleInfoService.getArticle();
  }

}
