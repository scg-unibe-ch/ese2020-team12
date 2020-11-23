import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {

  constructor(
    public articleInfoService: ArticleInfoService,
  ) { }

  currentArticleArray: any;

  ngOnInit(): void {
    this.currentArticleArray = this.articleInfoService.getSellArticleById(3);    // todo: fetch id from previous page
  }

}
