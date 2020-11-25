import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from '../../article-info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-privatelessons',
  templateUrl: './privatelessons.component.html',
  styleUrls: ['./privatelessons.component.css']
})
export class PrivatelessonsComponent implements OnInit {

  constructor(
    public articleInfoService: ArticleInfoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.articleInfoService.getServiceCategory(5);
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
