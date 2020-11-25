import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../../article-info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-garden-lawn',
  templateUrl: './garden-lawn.component.html',
  styleUrls: ['./garden-lawn.component.css']
})
export class GardenLawnComponent implements OnInit {

  constructor(
    public articleInfoService: ArticleInfoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.articleInfoService.getServiceCategory(3);
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
