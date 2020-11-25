import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserInfoService} from '../user-info.service';
import {ArticleInfoService} from '../article-info.service';

interface SellCategory {
  name: string;
  id: number;
}

interface SellDelivery {
  value: boolean;
  viewValue: string;
}
interface LendPricing {
  value: string;
}
interface LendingStatus {
  value: boolean;
  viewValue: string;
}

interface LendCategory {
  name: string;
  id: number;
}

interface ServicePricing{
  value: string;
}
interface ServiceCategory {
  name: string;
  id: number;
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

  sellAddArticleForm: FormGroup;
  lendAddArticleForm: FormGroup;
  serviceAddArticleForm: FormGroup;

  sellCategories: SellCategory[] = [
    {name: 'clothes/shoes', id: 1},
    {name: 'electronics', id: 2},
    {name: 'household/garden', id: 3},
    {name: 'real estate', id: 4},
    {name: 'sport', id: 5},
    {name: 'vehicles', id: 6},
  ];

  sellDeliveryOptions: SellDelivery[] = [
    {value: true, viewValue: 'Yes'},
    {value: false, viewValue: 'No'}
  ];

  lendPricingOptions: LendPricing[] = [
    {value: 'per hour'},
    {value: 'per day'}
  ];
  lendStatusOptions: LendingStatus[] = [
    {value: true, viewValue: 'Available'},
    {value: false, viewValue: 'Unavailable'}
  ];
  // change id with accordance to backend
  lendCategories: LendCategory[] = [
    {name: 'clothes/shoes', id: 1},
    {name: 'electronics', id: 2},
    {name: 'household/garden', id: 3},
    {name: 'real estate', id: 4},
    {name: 'sport', id: 5},
    {name: 'vehicles', id: 6},
  ];

  servicePricingOptions: ServicePricing[] = [
    {value: 'per hour'},
    {value: 'per day'}
  ];
  // change id with accordance to backend
  serviceCategories: ServiceCategory[] = [
    {name: 'babysitting', id: 1},
    {name: 'car pool', id: 2},
    {name: 'garden', id: 3},
    {name: 'household', id: 4},
    {name: 'private lessons', id: 5},
    {name: 'reparations', id: 6},
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private userInfoService: UserInfoService,
    private articleInfoService: ArticleInfoService,
    private router: Router
  ) {
    this.sellAddArticleForm = this.formBuilder.group({
      sellTitle: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      sellPrice: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      sellCategory: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      sellDescription: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      sellLocation: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      sellDelivery: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      sellDeliverySpecs: new FormControl('', Validators.compose(
        [Validators.required]
      ))
    });
    this.lendAddArticleForm = this.formBuilder.group({
      lendTitle: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      lendPrice: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      lendPricingType: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      lendCategory: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      lendDescription: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      lendLocation: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      lendLendingStatus: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      lendHandling: new FormControl('', Validators.compose(
        [Validators.required]
      ))
    });
    this.serviceAddArticleForm = this.formBuilder.group({
      serviceTitle: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      servicePrice: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      servicePricingType: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      serviceCategory: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      serviceDescription: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      serviceLocation: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      serviceExpenses: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      serviceExpensesCost: new FormControl('', Validators.compose(
        [Validators.required]
      ))
    });
      }


  ngOnInit(): void {
  }

  sellAddArticleRequest(): void {
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
      this.articleInfoService.saveSellArticleTemp(res.sellProductId);
    });
    setTimeout(() =>
      {
        this.router.navigate(['/article-page']);
      },
      1000);
  }

  lendAddArticleRequest(): void {
    this.httpClient.post(environment.endpointURL + 'add-article/lend-product/', {
      title: this.lendTitle,
      price: this.lendPrice,
      hourOrDay: this.lendPricingType,
      category: this.lendCategory,
      description: this.lendDescription,
      location: this.lendLocation,
      status: this.lendLendingStatus,
      handling: this.lendHandling,
      userId: this.userInfoService.getUserId()
    }).subscribe((res: any) => {
      this.articleInfoService.saveLendArticleTemp(res.lendProductId);
    });
    setTimeout(() =>
      {
        this.router.navigate(['/article-page-lend']);
      },
      1000);
  }

  serviceAddArticleRequest(): void {
    this.httpClient.post(environment.endpointURL + 'add-article/provide-service/', {
      title: this.serviceTitle,
      price: this.servicePrice,
      hourOrDay: this.servicePricingType,
      category: this.serviceCategory,
      description: this.serviceDescription,
      location: this.serviceLocation,
      expenses: this.serviceExpenses,
      expCost: this.serviceExpensesCost,
      userId: this.userInfoService.getUserId()
    }).subscribe((res: any) => {
      this.articleInfoService.saveServiceArticleTemp(res.serviceId);
    });
    setTimeout(() =>
      {
        this.router.navigate(['/article-page-service']);
      },
      1000);
  }
}
