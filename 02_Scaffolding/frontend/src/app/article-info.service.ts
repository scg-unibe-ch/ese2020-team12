/* tslint:disable:no-trailing-whitespace */

import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

interface ArticleAttributes{
  text: string;
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleInfoService {

  articleId;
  articleType;

  allSearchResults: any[];
  productSearchResults: any[];
  serviceSearchResults: any[];
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


  /**
   * clears the locally stored array allSearchResults[]
   * loops through the database of articles
   * stores every match with the searchTerm to the allSearchResults[]
   * adds the results into a local array
   * @param searchTerm (matching pattern)
   */
  searchEverything(searchTerm: string): void {
    this.allSearchResults = [];
    this.httpClient.get(environment.endpointURL + 'search/sellproduct?search=' + searchTerm)
      .subscribe((res: any) => {
        this.allSearchResults.push(res);
      });
    this.httpClient.get(environment.endpointURL + 'search/lendproduct?search=' + searchTerm)
      .subscribe((res: any ) => {
        this.allSearchResults.push(res);
      });
    this.httpClient.get(environment.endpointURL + 'search/provided-service?search=' + searchTerm)
      .subscribe((res: any ) => {
        this.allSearchResults.push(res);
      });
  }


  // stores an array of all the articles of a certain user and type
  getArticlesByTypeUserId( articleType: string, userId: number): void{
    // code
  }

  // store one article specifically (by type and id) in the service
  getArticleByTypeId( articleType: string, articleId: number): void{
    // code
  }


  // getters and setters for this article specifically

  getAllSearchResults(): any{
    return this.allSearchResults;
  }

  getSingleArticleInfo(articleNumber: number): void{
    let singleArticle = this.allSearchResults[articleNumber];

    this.saveGeneralInfo(singleArticle);

    //check whether its a Lend/sell Product or a service
    if(this.getSellProductId(singleArticle) != null){
      this.saveSellProductInfo(singleArticle);
    }
    if(this.getLendProductId(singleArticle) != null){
      this.saveLendProductInfo(singleArticle);
    }
    if(this.getServiceId(singleArticle) != null){
      this.saveServiceInfo(singleArticle);
    }
  }
  
  saveGeneralInfo(article: any){
    this.title = article.title;
    this.price = article.price;
    this.description = article.description;
    this.location = article.location;
    this.userId = article.userId;
    this.category = article.category;
  }

  saveSellProductInfo(article: any){
    this.sellProductId = article.sellProductId;
    this.delivery = article.delivery;
    this.delSpec = article.delSpec;
  }

  saveLendProductInfo(article: any){
    this.lendProductId = article.lendProductId;
    this.hourOrDay = article.hourOrDay;
    this.status = article.status;
    this.handling = article.handling;
  }

  saveServiceInfo(article: any){
    this.serviceId = article.serviceId;
    this.expenses = article.expenses;
    this.expCost = article.expCost;
  }

  //general get-methodes
  getTitle(article: any){
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
  


  constructor(
    private httpClient: HttpClient
  ) {
  }
}
