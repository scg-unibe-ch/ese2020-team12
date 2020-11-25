import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../../article-info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reparations',
  templateUrl: './reparations.component.html',
  styleUrls: ['./reparations.component.css']
})
export class ReparationsComponent implements OnInit {

  constructor(
    public articleInfoService: ArticleInfoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.articleInfoService.getServiceCategory(6);
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
