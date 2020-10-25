import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';


interface Pricing{
  value: string;
}

@Component({
  selector: 'app-provide-service',
  templateUrl: './provide-service.component.html',
  styleUrls: ['./provide-service.component.css']
})
export class ProvideServiceComponent implements OnInit {

  articleType;
  title;
  price;
  pricingType;
  description;
  location;
  expenses;
  expensesCost;

  addArticleForm: FormGroup;
  pricingOptions: Pricing[] = [
    {value: 'per hour'},
    {value: 'per day'}
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
      expenses: new FormControl(''),
      expensesCost: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  addArticleRequest() {

  }
}
