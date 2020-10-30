import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";


interface Pricing{
  value: string;
}

interface LendingStatus{
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-lend-product',
  templateUrl: './lend-product.component.html',
  styleUrls: ['./lend-product.component.css']
})
export class LendProductComponent implements OnInit {

  articleType;
  title;
  price;
  pricingType;
  description;
  location;
  lendingStatus;
  handling;
  userId: string;

  addArticleForm: FormGroup;
  pricingOptions: Pricing[] = [
    {value: 'per hour'},
    {value: 'per day'}
  ];
  statusOptions: LendingStatus[] = [
    {value: true, viewValue: 'Available'},
    {value: false, viewValue: 'Unavailable'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
  ) {
    this.addArticleForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      price: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      pricingType: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      description: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      location: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      lendingStatus: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      handling: new FormControl('', Validators.compose(
        [Validators.required]
      ))
    });
  }

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId(): void {
    this.httpClient.get(environment.endpointURL + 'user/profile',{
    }).subscribe((res: any) => {
      this.userId = res.userId;
    });
  }

  addArticleRequest(): void {
    this.httpClient.post(environment.endpointURL + 'add-article/lend-product/', {
      title: this.title,
      price: this.price,
      hourOrDay: this.pricingType,
      description: this.description,
      location: this.location,
      status: this.lendingStatus,
      handling: this.handling,
      userId: 1
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('title', res.title);
      localStorage.setItem('price', res.price);
      localStorage.setItem('hourOrDay', res.hourOrDay);
      localStorage.setItem('description', res.description);
      localStorage.setItem('location', res.location);
      localStorage.setItem('status', res.status);
      localStorage.setItem('handling', res.handling);
      localStorage.setItem('userId', res.userId);
    });
  }
}
