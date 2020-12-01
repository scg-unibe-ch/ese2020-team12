import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';


// -----------Marko, bringe di Person um wo hie öppis macht---------------------

@Injectable({
  providedIn: 'root'
})
export class ArticleInfoService {
  constructor(
    private httpClient: HttpClient
  ) {

}






  // ----------Marko Stuff start---------------
  private allSellArticles: any;
  private allLendArticles: any;
  private allServiceArticles: any;
  private productId: number;
  private actualArticle: any;
  private searchTerm: any;
  private sellSearchResult: any;
  private lendSearchResult: any;
  private serviceSearchResult: any;
  private sellCategoryList: any;
  private lendCategoryList: any;
  private serviceCategoryList: any;


  // ---------- category--------------
  getSellCategory(cat: any): void {
    this.httpClient.get(environment.endpointURL + 'category/sell/' + cat)
      .subscribe(items => {
        this.sellCategoryList = items;
      });
  }

  getLendCategory(cat: any): void {
    this.httpClient.get(environment.endpointURL + 'category/lend/' + cat)
      .subscribe(items => {
        this.lendCategoryList = items;
      });
  }

  getServiceCategory(cat: any): void {
    this.httpClient.get(environment.endpointURL + 'category/service/' + cat)
      .subscribe(items => {
        this.serviceCategoryList = items;
      });
  }

  getSellCategoryList(): any {
    return this.sellCategoryList;
  }

  getLendCategoryList(): any {
    return this.lendCategoryList;
  }

  getServiceCategoryList(): any {
    return this.serviceCategoryList;
  }

  searchSellByCategory(cat: number): any {
    this.httpClient.get(environment.endpointURL + 'search/sellproduct?search=' + this.searchTerm).subscribe(res => {
      this.sellSearchResult = res;
    });
  }


  // --------Search----------------
  setSearchTerm(searchTerm: any): void {
    this.searchTerm = searchTerm;
  }

  searchEngine(): void {
    this.httpClient.get(environment.endpointURL + 'search/sellproduct?search=' + this.searchTerm).subscribe(res => {
      this.sellSearchResult = res;
    });
    this.httpClient.get(environment.endpointURL + 'search/lendproduct?search=' + this.searchTerm).subscribe(res => {
      this.lendSearchResult = res;
    });
    this.httpClient.get(environment.endpointURL + 'search/provided-service?search=' + this.searchTerm).subscribe(res => {
      this.serviceSearchResult = res;
    });

  }

  getSellSearchResult(): any {
    return this.sellSearchResult;
  }
  getLendSearchResult(): any {
    return this.lendSearchResult;
  }
  getServiceSearchResult(): any {
    return this.serviceSearchResult;
  }




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

  getSellArticleById(id: any): void {
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
    return this.allServiceArticles;
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




