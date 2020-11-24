import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';

@Component({
  selector: 'app-sellproduct-page',
  templateUrl: './sellproduct-page.component.html',
  styleUrls: ['./sellproduct-page.component.css']
})
export class SellproductPageComponent implements OnInit {

  articleIds: number[];

  articles: any; // an array of article arrays

  currentArticleArray: any;

  constructor(
    public articleInfoService: ArticleInfoService,
  ) {}

  ngOnInit(): void {
    this.getArticleIdsFromAIS();
    this.getArticles();
    console.log(this.getArticleArrayFromId(2)); // works
  }

  /**
   * gets all the necessary sellProductIds from the backend
   * PROBLEM: array seems to be correct, but is empty/undefined when i try to access it
   */
  getArticleIdsFromAIS(): void {
    this.articleInfoService.fetchAllSellProductIds();
    this.articleIds = this.articleInfoService.getSellSearchIds();
  }

  /**
   * should store all the articles as arrays within the "articles" array
   * PROBLEM: cannot access articleIds array correctly
   */
  getArticles(): void {
    console.log(this.articleIds);         // returns array of ids (23.11 - 21:30)
    console.log(this.articleIds.length);  // returns 0            (23.11 - 21:30)
    console.log(this.articleIds[1]);      // returns undefined    (23.11 - 21:30)
    this.articles = [];
    for (let id of this.articleIds) {
      let currentArticleArr = this.articleInfoService.getSellArticleById(id);
      this.articles.push(currentArticleArr);
    }
  }

  /**
   * returns the array of an article's attributes
   * WORKS
   * @param id: takes in the id of the article
   */
  getArticleArrayFromId(id: number): any {
    this.currentArticleArray = this.articleInfoService.getSellArticleById(id);
    return this.currentArticleArray;
  }

  /*
  tried it in the html via this method, did not work
  accessArticleAttribute(id: number, attribute: number): any {
    // stores attributes of one specific article
    this.currentArticleArray = [];
    this.currentArticleArray = this.articles[id];
    this.getArticleArrayFromId(id);
    // return this.currentArticleArray[attribute];
  }
   */



}

