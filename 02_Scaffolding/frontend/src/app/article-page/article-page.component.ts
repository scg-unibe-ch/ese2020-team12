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
  
  currentArticleId: number;
  currentTitle: any;

  ngOnInit(): void {
    this.articleInfoService.getSellArticleById(this.articleInfoService.currentArticleId);
    console.log(this.currentArticleId = this.articleInfoService.getCurrentArticleId());
    console.log(this.currentTitle = this.articleInfoService.getCurrentTitle());
  }

}
