/* tslint:disable:no-trailing-whitespace */

import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

class SellProduct{
  sellProductId: number;
  userId: number;
  title: string;
  price: string;
  description: string;
  location: string;
  category: number;
  // SP specific:
  delivery: boolean;
  delSpec: string;
}

class LendProduct{
  lendProductId: number;
  userId: number;
  title: string;
  price: string;
  description: string;
  location: string;
  category: number;
  // LP specific:
  hourOrDay: boolean;
  status: boolean;
  handling: string;
}

class ServiceProduct{
  serviceId: number;
  userId: number;
  title: string;
  price: string;
  description: string;
  location: string;
  category: number;
  // PS specific:
  hourOrDay: boolean;
  expenses: string;
  expCost: string;
}


@Injectable({
  providedIn: 'root'
})
export class ArticleInfoService {

  iteratorArray: any[];

  private sellSearchResults: SellProduct[];
  private lendSearchResults: LendProduct[];
  private servSearchResults: ServiceProduct[];

  // Public Search Methods

  public searchEverything(searchTerm: string): void {
    this.sellSearch(searchTerm);
    this.lendSearch(searchTerm);
    this.servSearch(searchTerm);
  }

  public sellSearch(searchTerm: string): void {
    this.sellSearchResults = [];
    this.iteratorArray = [];
    this.httpClient.get(environment.endpointURL + 'search/sellproduct?search=' + searchTerm)
      .subscribe((res: any) => {
        this.iteratorArray = res;
      });
    this.storeArticles(this.iteratorArray, 'sell');
  }

  public lendSearch(searchTerm: string): void {
    this.lendSearchResults = [];
    this.iteratorArray = [];
    this.httpClient.get(environment.endpointURL + 'search/lendproduct?search=' + searchTerm)
      .subscribe((res: any) => {
        this.iteratorArray = res;
      });
    this.storeArticles(this.iteratorArray, 'lend');
  }

  public servSearch(searchTerm: string): void {
    this.sellSearchResults = [];
    this.iteratorArray = [];
    this.httpClient.get(environment.endpointURL + 'search/provided-service?search=' + searchTerm)
      .subscribe((res: any) => {
        this.iteratorArray = res;
      });
    this.storeArticles(this.iteratorArray, 'service');
  }

  // Private Methods to conduct search

  private storeArticles(articleArray: any, type: string): void{
    switch (type){
      case 'sell': {
        this.iterateSellProducts(articleArray);
        break;
      }
      case 'lend': {
        this.iterateLendProducts(articleArray);
        break;
      }
      case 'service': {
        this.iterateServProducts(articleArray);
        break;
      }
    }
  }

  private iterateSellProducts(articleArray: any): void {
    for (const article of articleArray) {
      const spi = new SellProduct();
      spi.sellProductId = article.sellProductId;
      spi.userId = article.userId;
      spi.title = article.title;
      spi.price = article.price;
      spi.description = article.description;
      spi.location = article.location;
      spi.category = article.category;
      spi.delivery = article.delivery;
      spi.delSpec = article.delSpec;
      this.sellSearchResults.push(spi);
    }
  }

  private iterateLendProducts(articleArray: any): void {
    for (const article of articleArray) {
      const lpi = new LendProduct();
      lpi.lendProductId = article.lendProductId;
      lpi.userId = article.userId;
      lpi.title = article.title;
      lpi.price = article.price;
      lpi.description = article.description;
      lpi.location = article.location;
      lpi.category = article.category;
      lpi.hourOrDay = article.hourOrDay;
      lpi.status = article.status;
      lpi. handling = article.handling;
      this.lendSearchResults.push(lpi);
    }
  }

  private iterateServProducts(articleArray: any): void {
    for (const article of articleArray) {
      const psi = new ServiceProduct();
      psi.serviceId = article.providedServiceId;
      psi.userId = article.userId;
      psi.title = article.title;
      psi.price = article.price;
      psi.description = article.description;
      psi.location = article.location;
      psi.category = article.category;
      psi.hourOrDay = article.hourOrDay;
      psi.expenses = article.expenses;
      psi.expCost = article.expCost;
      this.servSearchResults.push(psi);
    }
  }

  // Search Result Array Getters

  public getSellSearchResults(): SellProduct[] {return this.sellSearchResults; }

  public getLendSearchResults(): LendProduct[] {return this.lendSearchResults; }

  public getServSearchResults(): ServiceProduct[] {return this.servSearchResults; }

constructor(
    private httpClient: HttpClient
  ) {

}

}

/*
  Old Code:
 /**
   * clears the locally stored array allSearchResults[]
   * loops through the database of articles
   * stores every match with the searchTerm to the allSearchResults[]
   * adds the results into a local array
   * @param searchTerm (matching pattern)
   // needs
searchEverything(searchTerm: string);: void {
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
};



// stores an array of all the articles of a certain user and type
getArticlesByTypeUserId( articleType: string, userId: number);: void{
  // code
};

// store one article specifically (by type and id) in the service
getArticleByTypeId( articleType: string, articleId: number);: void{
  // code
};


// getters and setters for this article specifically

/*

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
*/

