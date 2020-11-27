import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from "../../article-info.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {
  sellDel;
  sellLoc = '';
  sellFilter: FormControl;
  sellLowerPrice = 0;
  sellUpperPrice = 0;
  sellFilterResult;
  loadedSellFilter = false;
  lendPricePer;

  lendLowerPrice = 0;
  lendUpperPrice = 0;
  loadedLendFilter = false;
  lendFilterResult;
  lendLoc = '';

  constructor(
    public articleInfoService: ArticleInfoService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.articleInfoService.getSellCategory(5);
    this.articleInfoService.getLendCategory(5);
  }
  radioFilter(input: any): any {
    if (input === 'true' || input === 'false' ){
      return input;
    } else {
      return '';
    }
  }

  moreSellInfos(id: number): void{
    this.articleInfoService.saveSellArticleTemp(id);
    setTimeout(() =>
      {
        this.router.navigate(['/article-page']);
      },
      1000);
  }
  moreLendInfos(id: number): void{
    this.articleInfoService.saveLendArticleTemp(id);
    setTimeout(() =>
      {
        this.router.navigate(['/article-page-lend']);
      },
      1000);
  }
  sellRadioChangeHandler(input: string): void {
    this.sellDel = input;
  }

  lendRadioChangeHandler(input: string): void {
    this.lendPricePer = input;
  }

  sellSendFilter(): void {
    // tslint:disable-next-line:max-line-length
    this.httpClient.get(environment.endpointURL + 'filter/sell/1?city=' + this.sellLoc + '&lowerPrice=' + this.sellLowerPrice + '&upperPrice=' + this.sellUpperPrice + '&delivery=' + this.radioFilter(this.sellDel))
      .subscribe(items => {
        this.sellFilterResult = items;
      } );
    setTimeout(() =>
      {
        this.loadedSellFilter = true;
      },
      1000);
  }


  lendSendFilter(): void {
    // tslint:disable-next-line:max-line-length
    this.httpClient.get(environment.endpointURL + 'filter/lend/1?city=' + this.lendLoc + '&lowerPrice=' + this.lendLowerPrice + '&upperPrice=' + this.lendUpperPrice + '&lendPricePer=' + this.radioFilter(this.lendPricePer))
      .subscribe(items => {
        this.lendFilterResult = items;
      } );
    setTimeout(() =>
      {
        console.log(this.lendFilterResult);
        this.loadedLendFilter = true;
      },
      1000);
  }

}
