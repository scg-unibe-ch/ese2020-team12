import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../../article-info.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
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
  sellFilter: FormControl;
  lowerPrice = 0;
  upperPrice = 0;
  sellFilterResult;
  loadedSellFilter = false;


  constructor(
    public articleInfoService: ArticleInfoService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.articleInfoService.getSellCategory(1);
    this.articleInfoService.getLendCategory(1);
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

  sellSendFilter(): void {
    console.log(environment.endpointURL + 'filter/sell/1?city=' + this.sellLoc + '&lowerPrice=' + this.lowerPrice + '&upperPrice=' + this.upperPrice + '&delivery= ' + this.sellDel);
    // tslint:disable-next-line:max-line-length
    this.httpClient.get(environment.endpointURL + 'filter/sell/1?city=' + this.sellLoc + '&lowerPrice=' + this.lowerPrice + '&upperPrice=' + this.upperPrice + '&delivery=' + this.sellDel)
      .subscribe(items => {
        this.sellFilterResult = items;
      } );
    setTimeout(() =>
      {
        this.loadedSellFilter = true;
      },
      1000);
  }

}
