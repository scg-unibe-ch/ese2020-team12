import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-article-page-service',
  templateUrl: './article-page-service.component.html',
  styleUrls: ['./article-page-service.component.css']
})
export class ArticlePageServiceComponent implements OnInit {

  public article: any;

  constructor(
    public articleInfoService: ArticleInfoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.article = this.articleInfoService.getArticle();
  }

  openSnackBar(message: string, action: string): void{
    this.snackBar.open(message, action, {
      duration: 8000,
    });
  }

}
