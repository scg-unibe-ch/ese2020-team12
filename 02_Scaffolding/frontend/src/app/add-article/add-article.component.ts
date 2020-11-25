import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserInfoService} from '../user-info.service';


interface ArticleType{
  text: string;
  link: string;
}

interface Delivery {
  value: boolean;
  viewValue: string;
}

interface Category {
  name: string;
  id: number;
}

interface Pricing {
  value: string;
}

interface LendingStatus {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  addArticleForm;
  sellTitle;
  sellPrice;
  sellCategory;
  sellDescription;
  sellLocation;
  sellDelivery;
  sellDeliverySpecs;

  lendTitle;
  lendPrice;
  lendPricingType;
  lendCategory;
  lendDescription;
  lendLocation;
  lendLendingStatus;
  lendHandling;

  serviceTitle;
  servicePrice;
  servicePricingType;
  serviceCategory;
  serviceDescription;
  serviceLocation;
  serviceExpenses;
  serviceExpensesCost;

  articleTypes: ArticleType[] = [
    {text: 'sell a product', link: '/add-article/sell-product'},
    {text: 'lend a product', link: '/add-article/lend-product'},
    {text: 'provide a service', link: '/add-article/provide-service'}
  ];

  // addArticleForm: FormGroup;
  deliveryOptions: Delivery[] = [
    {value: true, viewValue: 'Yes'},
    {value: false, viewValue: 'No'}
  ];

  pricingOptions: Pricing[] = [
    {value: 'per hour'},
    {value: 'per day'}
  ];

  statusOptions: LendingStatus[] = [
    {value: true, viewValue: 'Available'},
    {value: false, viewValue: 'Unavailable'}
  ];

  // change id with accordance to backend
  categories: Category[] = [
    {name: 'clothes/shoes', id: 1},
    {name: 'electronics', id: 2},
    {name: 'household/garden', id: 3},
    {name: 'real estate', id: 4},
    {name: 'sport', id: 5},
    {name: 'vehicles', id: 6},
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private userInfoService: UserInfoService
  ) {
    // this.articleForm = new FormControl('', Validators.compose([Validators.required]))
    this.addArticleForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      price: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      category: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      description: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      location: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      delivery: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      deliverySpecs: new FormControl('', Validators.compose(
        [Validators.required]
      ))
    });
  }

  ngOnInit(): void {
  }

  addArticleRequest(): void {
    this.httpClient.post(environment.endpointURL + 'add-article/sell-product/', {
      title: this.sellTitle,
      price: this.sellPrice,
      category: this.sellCategory,
      description: this.sellDescription,
      location: this.sellLocation,
      delivery: this.sellDelivery,
      delSpec: this.sellDeliverySpecs,
      userId: this.userInfoService.getUserId()
    }).subscribe((res: any) => {
      // Set user data in local storage
      // we dont need that, right? (mauri 13.11)
      localStorage.setItem('title', res.title);
      localStorage.setItem('price', res.price);
      localStorage.setItem('description', res.description);
      localStorage.setItem('location', res.location);
      localStorage.setItem('delivery', res.delivery);
      localStorage.setItem('delSpec', res.delSpec);
    });
  }

}
