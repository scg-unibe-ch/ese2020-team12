import { Component, OnInit } from '@angular/core';
import {UserInfoService} from '../user-info.service';
import {ArticleInfoService} from '../article-info.service';

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

  b1: any;
  b2: any;
  b3: any;
  bArray: any;
  slideIndex: number;

  ngOnInit(): void {
    //this.slideShow();
    //this.b1 = document.getElementById('banner-1');
    //this.b1.style.display = "none";
  }

  /*slideShow(){
    this.b1 = document.getElementById('banner-1');
    this.b2 = document.getElementById('banner-2');
    this.b3 = document.getElementById('banner-3');
    this.bArray = [this.b1, this.b2, this.b3];
    this.slideIndex = 0;
    setInterval(this.showSlides, 2000);
  }*/

  /*showSlides(){
    var i;
    for (i = 0; i < this.bArray.length; i++) {
      this.bArray[i].style.display = "none";
      console.log(i);
    }
    this.slideIndex++;
    if (this.slideIndex == this.bArray.length) {this.slideIndex = 0}
    console.log(this.bArray.length);
    this.bArray[this.slideIndex].style.display = "block";
  }*/

  //b2 = document.getElementById("banner-2");
  //b3 = document.getElementById("banner-3");
  //b: any;
  //bIndex = 0;

  /*slideShow(){
    this.b = [this.b1, this.b2, this.b3]
    for(let i in this.b) {
      this.b[i].style.display = "none";
    }
    if (this.bIndex > 2) {this.bIndex = 0}
    this.b[this.bIndex].style.display = "block";
    setTimeout(this.slideShow, 3000);

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
