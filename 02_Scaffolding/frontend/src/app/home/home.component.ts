import { Component, OnInit } from '@angular/core';
import {UserInfoService} from "../user-info.service";
import {ArticleInfoService} from "../article-info.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // articleIds: any;

  constructor(
    public articleInfoService: ArticleInfoService
  ) {
    // this.articleIds = this.articleInfoService.getArticlesByType('sell');
  }

  ngOnInit(): void {
    //this.SlideShow();
  }

  /**SlideShow(){
      var slideIndex = 0;
  showSlides();

  function showSlides() {
    var i;
    var slides = document.getElementsByClassName("banner");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
    }

  }*/
}
