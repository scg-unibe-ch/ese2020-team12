import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {

  public article: any;


  constructor(
    public articleInfoService: ArticleInfoService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.article = this.articleInfoService.getArticle();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 8000,
    });
  }
}
