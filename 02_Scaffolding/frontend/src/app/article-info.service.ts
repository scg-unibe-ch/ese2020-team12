/* tslint:disable:no-trailing-whitespace */

import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {delay, take} from 'rxjs/operators';
import {Observable, Subscription, timer} from "rxjs";

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

  // tslint:disable-next-line:max-line-length
  constructor(sellProductId: number, userId: number, title: string, price: string, description: string, location: string, category: number, delivery: boolean, delSpec: string) {
    this.sellProductId = sellProductId;
    this.userId = userId;
    this.title = title;
    this.price = price;
    this.description = description;
    this.location = location;
    this.category = category;
    this.delivery = delivery;
    this.delSpec = delSpec;
  }
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
  constructor(
    private httpClient: HttpClient
  ) {

}



  iteratorArray: any[];

  private sellSearchResults: number[];

  private lendSearchResults: number[];
  private servSearchResults: number[];
  private sellResults: number[];

  private lendResults: number[];
  private servResults: number[];
  public currentArticleId: number;

  // ----------Marko Stuff ende---------------

  public currentArticleObject: any;



  // ----------Marko Stuff start---------------
  private allSellArticles: any;
  private allLendArticles: any;
  private allServiceArticles: any;
  private productId: number;
  private actualArticle: any;


  // -----------Marko, bringe di Person um wo hie öppis macht---------------------


  // SELL
  saveAllSellArticles(): void {
    this.httpClient.get(environment.endpointURL + 'article/sell/')
      .subscribe((res) => {
        this.allSellArticles = res;
        }
      );
  }

  getAllSellArticles(): any[] {
    return this.allSellArticles;
  }

  saveSellArticleTemp(id: number): void {
    this.httpClient.get(environment.endpointURL + 'article/sell/' + id)
    .subscribe(res => {
        this.actualArticle = res;
    });
  }

  // LEND
  saveAllLendArticles(): void {
    this.httpClient.get(environment.endpointURL + 'article/lend/')
      .subscribe((res) => {
          this.allLendArticles = res;
        }
      );
  }

  getAllLendArticles(): any[] {
    return this.allLendArticles;
  }

  saveLendArticleTemp(id: number): void {
    this.httpClient.get(environment.endpointURL + 'article/lend/' + id)
      .subscribe(res => {
        this.actualArticle = res;
      });
  }

  // SERVICE
  saveAllServiceArticles(): void {
    this.httpClient.get(environment.endpointURL + 'article/service/')
      .subscribe((res) => {
          this.allServiceArticles = res;
        }
      );
  }

  getAllServiceArticles(): any[] {
    return this.allLendArticles;
  }

  saveServiceArticleTemp(id: number): void {
    this.httpClient.get(environment.endpointURL + 'article/service/' + id)
      .subscribe(res => {
        this.actualArticle = res;
      });
  }

  getId(): any {
    return this.productId;
  }

  getArticle(): any {
    return this.actualArticle;
  }


}

/*mauri stuff
public searchEverything(searchTerm: string): void {
    this.sellSearch(searchTerm);
    this.lendSearch(searchTerm);
    this.servSearch(searchTerm);
  }

  public sellSearch(searchTerm: string): void {
    this.sellSearchResults = [];
    this.httpClient.get(environment.endpointURL + 'search/sellproduct?search=' + searchTerm)
      .subscribe((res: any) => {
        this.storeArticles(res, 'sell');
      });
  }

  public lendSearch(searchTerm: string): void {
    this.lendSearchResults = [];
    this.iteratorArray = [];
    this.httpClient.get(environment.endpointURL + 'search/lendproduct?search=' + searchTerm)
      .subscribe((res: any) => {
        this.storeArticles(res, 'lend');
      });

  }

  public servSearch(searchTerm: string): void {
    this.sellSearchResults = [];
    this.iteratorArray = [];
    this.httpClient.get(environment.endpointURL + 'search/provided-service?search=' + searchTerm)
      .subscribe((res: any) => {
        this.storeArticles(res, 'service');
      });

  }

  // Private Methods to conduct fetching
  private storeArticles(articleArray: any, type: string): void{
    switch (type){
      case 'sell': {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0 ; i < articleArray.length ; i++) {
          const articleId = articleArray[i].sellProductId;
          this.sellSearchResults.push(articleId);
        }
        break;
      }
      case 'lend': {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0 ; i < articleArray.length ; i++) {
          const articleId = articleArray[i].lendProductId;
          this.lendSearchResults.push(articleId);
        }
        break;
      }
      case 'service': {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0 ; i < articleArray.length ; i++) {
          const articleId = articleArray[i].providedServiceId;
          this.servSearchResults.push(articleId);
        }
        break;
      }
    }
  }

  // Search Result Id Array Getters
  public getSellSearchIds(): number[] {return this.sellSearchResults; }

  public getLendSearchIds(): number[] {return this.lendSearchResults; }

  public getServSearchIds(): number[] {return this.servSearchResults; }

  /**
   * returns the attributes of a sell-product article as an array:
   * index:      meaning:
   * 0           sellProductId
   * 1           userId
   * 2           title
   * 3           price
   * 4           description
   * 5           location
   * 6           category
   * 7           delivery
   * 8           delSpec
   * @param id: needs the id as a parameter to fetch attributes
   */ /*
getSellArticleById(id: number): any {
  let articleAsArray: any[];
  articleAsArray = [];
  this.httpClient.get(environment.endpointURL + 'article/sell/' + id.toString())
    .subscribe((res: any) => {
      articleAsArray.push(res.sellProductId);
      articleAsArray.push(res.userId);
      articleAsArray.push(res.title);
      articleAsArray.push(res.price);
      articleAsArray.push(res.description);
      articleAsArray.push(res.location);
      articleAsArray.push(res.category);
      // SP specific:
      articleAsArray.push(res.delivery);
      articleAsArray.push(res.delSpec);
    });
  return articleAsArray;
}

/**
 * returns the attributes of a lend-product article as an array:
 * index:      meaning:
 * 0           lendProductId
 * 1           userId
 * 2           title
 * 3           price
 * 4           description
 * 5           location
 * 6           category
 * 7           hourOrDay
 * 8           status
 * 9           handling
 * @param id: needs the id as a parameter to fetch attributes
 */ /*
getLendArticleById(id: number): any {
  let articleAsArray: any[];
  articleAsArray = [];
  this.httpClient.get(environment.endpointURL + '/lend/:' + id.toString())
    .subscribe((res: any) => {
      articleAsArray.push(res.lendProductId);
      articleAsArray.push(res.userId);
      articleAsArray.push(res.title);
      articleAsArray.push(res.price);
      articleAsArray.push(res.description);
      articleAsArray.push(res.location);
      articleAsArray.push(res.category);
      // LP specific:
      articleAsArray.push(res.hourOrDay);
      articleAsArray.push(res.status);
      articleAsArray.push(res.handling);
    });
  return articleAsArray;
}

/**
 * returns the attributes of a service-product article as an array:
 * index:      meaning:
 * 0           serviceId
 * 1           userId
 * 2           title
 * 3           price
 * 4           description
 * 5           location
 * 6           category
 * 7           hourOrDay
 * 8           expenses
 * 9           expCost
 * @param id: needs the id as a parameter to fetch attributes
 */ /*
getServArticleById(id: number): any {
  let articleAsArray: any[];
  articleAsArray = [];
  this.httpClient.get(environment.endpointURL + '/service/:' + id.toString())
    .subscribe((res: any) => {
      articleAsArray.push(res.serviceId);
      articleAsArray.push(res.userId);
      articleAsArray.push(res.title);
      articleAsArray.push(res.price);
      articleAsArray.push(res.description);
      articleAsArray.push(res.location);
      articleAsArray.push(res.category);
      // PS specific:
      articleAsArray.push(res.hourOrDay);
      articleAsArray.push(res.expenses);
      articleAsArray.push(res.expCost);
    });
  return articleAsArray;
}


// Just like the search methods, these methods fetch all the ids of the articles of a category
fetchAllSellProductIds(): void {
  this.sellSearchResults = [];
  this.httpClient.get(environment.endpointURL + 'search/sellproduct?search=' + '')
    .subscribe((res: any) => {
      // console.log(res.length);
      this.storeArticles(res, 'sell');
      // console.log(this.sellSearchResults);
    });
}

fetchAllLendProductIds(): void {
  this.lendSearchResults = [];
  this.httpClient.get(environment.endpointURL + 'article/lend/')
    .subscribe( (res: any) => {
      this.storeArticles(res, 'lend');
    });
}

fetchAllServiceProductIds(): void {
  this.servSearchResults = [];
  this.httpClient.get(environment.endpointURL + 'article/service/')
    .subscribe( (res: any) => {
      this.storeArticles(res, 'service');
    });
}



getCurrentTitle(): string{
  return this.currentArticleObject.title;
}

getCurrentArticleId(): number{
  return this.currentArticleId;
}

passId(currentArticleId: number): void{
  console.log('Hier sollte die angeklickte Article Id erscheinen:');
  console.log(currentArticleId);
  this.currentArticleId = null;
  this.currentArticleId = currentArticleId;
}
 */


/*
  Old Code:

  // this doesnt work
  getSellArticleById(id: number): void {
    this.currentArticleObject = null;
    this.httpClient.get(environment.endpointURL + 'article/sell/:' + id)
      .subscribe((res: any) => {
        this.currentArticleObject = res;
      });
  }

 */
  /*
  private iterateSellProducts(articleArray: any): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < articleArray.length ; i++) {
      const articleId = articleArray[i].sellProductId;
      this.sellSearchResults.push(articleId);
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


