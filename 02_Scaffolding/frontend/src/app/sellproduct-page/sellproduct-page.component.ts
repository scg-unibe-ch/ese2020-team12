import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';

@Component({
  selector: 'app-sellproduct-page',
  templateUrl: './sellproduct-page.component.html',
  styleUrls: ['./sellproduct-page.component.css']
})
export class SellproductPageComponent implements OnInit {

  articles: any[];

  constructor(
    public articleInfoService: ArticleInfoService,
  ) {
    this.articles = articleInfoService.returnSellProducts();
    console.log(this.articles);
  }

  ngOnInit(): void {
  }

}
