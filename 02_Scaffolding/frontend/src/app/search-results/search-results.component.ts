import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from "../article-info.service";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  allSearchResults: any[];
   //General Info
   title: string;
   price: string;
   description: string;
   location: string;
   userId: number;
   category: number;
   //SellProductInfo
   sellProductId: number;
   delivery: boolean;
   delSpec: string;
   //LendProductInfo
   lendProductId: number;
   hourOrDay: boolean;
   status: boolean;
   handling: string;
   //SericeInfo
   serviceId: number;
   expenses: string;
   expCost: string;

  constructor(
    public articleInfoService: ArticleInfoService,
  ) {
    this.allSearchResults = articleInfoService.getAllSearchResults();
  }

  ngOnInit(): void {
    this.getMatches(this.allSearchResults);
  }

  getMatches(articleArray: any){
    for(let i = 0; i < articleArray.length; i++){
      this.articleInfoService.getSingleArticleInfo(articleArray[i]);
      this.saveGeneralInfo();
    }
  }

  saveGeneralInfo(): void{
    this.title = this.articleInfoService.title;
    this.price = this.articleInfoService.price;
    this.description = this.articleInfoService.description;
    this.location = this.articleInfoService.location;
    this.userId = this.articleInfoService.userId;
    this.category = this.articleInfoService.category;
  }

  //general get-methodes
  getTitle(): any{
    return this.title;
  }
  getPrice(article: any){
    return this.price;
  }
  getDescription(article: any){
    return this.description;
  }
  getLocation(article: any){
    return this.location;
  }
  getUserId(article: any){
    return this.userId;
  }
  getCategory(article: any){
    return this.category;
  }

  //sellProduct get-methodes
  getSellProductId(article: any){
    return this.sellProductId;
  }
  getDelivery(article: any){
    return this.delivery;
  }
  getDelSpec(article: any){
    return this.delSpec;
  }
  

  //lendProduct get-methodes
  getLendProductId(article: any){
    return this.lendProductId;
  }
  getHourOrDay(article: any){
    return this.hourOrDay;
  }
  getStatus(article: any){
    return this.status;
  }
  getHandling(article: any){
    return this.handling;
  }
  
  //provideService get-methodes
  getServiceId(article: any){
    return this.serviceId;
  }
  getExpenses(article: any){
    return this.expenses;
  }
  getExpCost(article: any){
    return this.expCost;
  }

}
