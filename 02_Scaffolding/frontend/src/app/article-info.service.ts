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

  constructor(
    private httpClient: HttpClient
  ) {
  }
}
