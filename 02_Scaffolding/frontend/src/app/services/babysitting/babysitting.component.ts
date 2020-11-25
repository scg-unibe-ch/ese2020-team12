import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../../article-info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-babysitting',
  templateUrl: './babysitting.component.html',
  styleUrls: ['./babysitting.component.css']
})
export class BabysittingComponent implements OnInit {

  constructor(
    public articleInfoService: ArticleInfoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.articleInfoService.getServiceCategory(1);
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
