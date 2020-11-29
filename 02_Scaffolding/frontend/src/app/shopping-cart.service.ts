import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  productIds: any;

  constructor(
    private httpClient: HttpClient
  ) { }

  addSellProduct(sellProductId: any, userId: any ): void {
   this.httpClient.post(environment.endpointURL + 'shopping-cart/', {
     userId: userId,
     sellProductId: sellProductId
   }).subscribe(item => {
   });
  }

  addLendProduct(lendProductId: any, userId: any ): void {
    this.httpClient.post(environment.endpointURL + 'shopping-cart/', {
      userId: userId,
      lendProductId: lendProductId
    }).subscribe(item => {
    });
  }

  addServiceProduct(serviceId: any, userId: any ): void {
    this.httpClient.post(environment.endpointURL + 'shopping-cart/', {
      userId: userId,
      serviceId: serviceId
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
}
