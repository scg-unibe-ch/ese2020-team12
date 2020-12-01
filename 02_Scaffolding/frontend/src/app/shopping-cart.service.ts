import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  productIds: any;
  sellList = [];
  lendList = [];
  serviceList = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  addSellProduct(sellProductId: any, userId: any ): void {
   this.httpClient.post(environment.endpointURL + 'shopping-cart/', {
     userId,
     sellProductId
   }).subscribe(item => {
   });
  }

  addLendProduct(lendProductId: any, userId: any ): void {
    this.httpClient.post(environment.endpointURL + 'shopping-cart/', {
      userId,
      lendProductId
    }).subscribe(item => {
    });
  }

  addServiceProduct(serviceId: any, userId: any ): void {
    this.httpClient.post(environment.endpointURL + 'shopping-cart/', {
      userId,
      serviceId
    }).subscribe(item => {
    });
  }

  getMarkedArticle(userId: any): void {
    this.httpClient.get(environment.endpointURL + 'shopping-cart/' + userId)
      .subscribe(res  => {
        this.productIds = res;
      });
  }
  getProductIds(): any {
    return this.productIds;
  }

  saveSellArticle(idList: any): void {
    this.sellList = [];
    for (const id of idList) {
      this.httpClient.get(environment.endpointURL + 'article/sell/' + id)
        .subscribe(res => {
          this.sellList.push(res);
        });
    }
  }

  saveLendArticle(idList: any): void {
    this.lendList = [];
    for (const id of idList) {
      this.httpClient.get(environment.endpointURL + 'article/lend/' + id)
        .subscribe(res => {
          this.lendList.push(res);
        });
    }
  }
  saveServiceArticle(idList: any): void {
    this.serviceList = [];
    for (const id of idList) {
      this.httpClient.get(environment.endpointURL + 'article/service/' + id)
        .subscribe(res => {
          this.serviceList.push(res);
        });
    }
  }

  getSellList(): any {
    return this.sellList;
  }

  getLendList(): any {
    return this.lendList;
  }

  getServiceList(): any {
    return this.serviceList;
  }

}
