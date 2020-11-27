import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../../article-info.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-carpool',
  templateUrl: './carpool.component.html',
  styleUrls: ['./carpool.component.css']
})
export class CarpoolComponent implements OnInit {
  servLoc = '';
  servLowerPrice = 0;
  servUpperPrice = 0;
  servFilterResult;
  loadedServFilter = false;
  servicePer;

  constructor(
    public articleInfoService: ArticleInfoService,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.articleInfoService.getServiceCategory(2);
  }

  moreServiceInfos(id: number): void{
    this.articleInfoService.saveServiceArticleTemp(id);
    setTimeout(() =>
      {
        this.router.navigate(['/article-page-service']);
      },
      1000);
  }

  radioFilter(input: any): any {
    if (input === 'true' || input === 'false' ){
      return input;
    } else {
      return '';
    }
  }

  servRadioChangeHandler(input: string): void {
    this.servicePer = input;
  }

  servSendFilter(): void {
    // tslint:disable-next-line:max-line-length
    this.httpClient.get(environment.endpointURL + 'filter/provided-service/2?city=' + this.servLoc + '&lowerPrice=' + this.servLowerPrice + '&upperPrice=' + this.servUpperPrice + '&servicePer=' + this.radioFilter(this.servicePer))
      .subscribe(items => {
        this.servFilterResult = items;
      } );
    setTimeout(() =>
      {
        this.loadedServFilter = true;
      },
      1000);
  }

}
