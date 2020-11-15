import { Component, OnInit } from '@angular/core';
import {ArticleInfoService} from "../article-info.service";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  allSearchResults: any[];

  constructor(
    public articleInfoService: ArticleInfoService,
  ) {
    this.allSearchResults = articleInfoService.getAllSearchResults();
  }

  ngOnInit(): void {
  }

}
