import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../../article-info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-household',
  templateUrl: './household.component.html',
  styleUrls: ['./household.component.css']
})
export class HouseholdComponent implements OnInit {

  constructor(
    public articleInfoService: ArticleInfoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.articleInfoService.getServiceCategory(4);
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
