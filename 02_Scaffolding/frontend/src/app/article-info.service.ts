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

  // stores an array of all the articles of a certain type
  getArticlesByType( articleType: string): void{
    switch (articleType) {
      case 'sell': {
        this.httpClient.get(environment.endpointURL + 'article/sell/')
          .subscribe((res: any ) => {
            // console.log(res);
          });
        break;
      }
      case 'lend': {
        this.httpClient.get(environment.endpointURL + 'article/lend/')
          .subscribe((res: any ) => {
            // code
          });
        break;
      }
      case 'service': {
        this.httpClient.get(environment.endpointURL + 'article/service/')
          .subscribe((res: any ) => {
            // code
          });
        break;
      }
      default: {
        console.warn('no data stored');
        break;
      }

    }
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

  constructor(
    private httpClient: HttpClient
  ) {
  }
}
