import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';

@Component({
  selector: 'app-article-page-lend',
  templateUrl: './article-page-lend.component.html',
  styleUrls: ['./article-page-lend.component.css']
})
export class ArticlePageLendComponent implements OnInit {

  public article: any;

  constructor(
    public articleInfoService: ArticleInfoService,
  ) {
    this.article = this.articleInfoService.getArticle();
  }

  ngOnInit(): void {
  }

}
