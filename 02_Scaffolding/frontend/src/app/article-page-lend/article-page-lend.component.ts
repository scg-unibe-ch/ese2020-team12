import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-article-page-lend',
  templateUrl: './article-page-lend.component.html',
  styleUrls: ['./article-page-lend.component.css']
})
export class ArticlePageLendComponent implements OnInit {

  public article: any;

  constructor(
    public articleInfoService: ArticleInfoService,
    private snackBar: MatSnackBar
  ) {
    this.article = this.articleInfoService.getArticle();
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string): void{
    this.snackBar.open(message, action, {
      duration: 8000,
    });
  }
}
