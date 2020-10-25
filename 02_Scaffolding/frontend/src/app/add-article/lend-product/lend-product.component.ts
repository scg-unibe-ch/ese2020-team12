import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';


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
  }

  addArticleRequest() {

  }
}
