import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';


@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {

  public article: any;

  constructor(
    public articleInfoService: ArticleInfoService,
  ) { }

  currentArticleArray: any;

  ngOnInit(): void {
    this.article = this.articleInfoService.getArticle();

  }

}
