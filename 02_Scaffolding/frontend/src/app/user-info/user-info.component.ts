import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../article-info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(
    public articleInfoService: ArticleInfoService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
  moreServiceInfos(id: number): void{
    this.articleInfoService.saveServiceArticleTemp(id);
    setTimeout(() =>
      {
        this.router.navigate(['/article-page-service']);
      },
      1000);
  }

}
