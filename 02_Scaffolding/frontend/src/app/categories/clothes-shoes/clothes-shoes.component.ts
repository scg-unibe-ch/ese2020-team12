import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../../article-info.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-clothes-shoes',
  templateUrl: './clothes-shoes.component.html',
  styleUrls: ['./clothes-shoes.component.css']
})
export class ClothesShoesComponent implements OnInit {
  sellDel;
  sellLoc = '';
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

  searchTerm;
  searchSellTerm;


  constructor(
    public articleInfoService: ArticleInfoService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.articleInfoService.getSellCategory(1);
    this.articleInfoService.getLendCategory(1);
  }

  radioFilter(input: any): any {
    if (input === 'true' || input === 'false' ){
      return input;
    } else {
      return '';
    }
  }

  searchSellCat(): void {
    console.log(this.searchSellTerm);
    this.articleInfoService.setSearchTerm(this.searchSellTerm);
    this.articleInfoService.searchSellByCategory(1);
    setTimeout(() =>
      {
        this.sellFilterResult = this.articleInfoService.getSellSearchResult();
      },
      1000);
    this.loadedSellFilter = true;
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
        this.loadedLendFilter = true;
      },
      1000);
  }

}
