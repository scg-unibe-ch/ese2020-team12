import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserInfoService} from '../../user-info.service';



interface Pricing{
  value: string;
}
interface Category {
  name: string;
  id: number;
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
  category;
  description;
  location;
  expenses;
  expensesCost;

  addArticleForm: FormGroup;
  pricingOptions: Pricing[] = [
    {value: 'per hour'},
    {value: 'per day'}
  ];
  // change id with accordance to backend
  categories: Category[] = [
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
    public userInfoService: UserInfoService,
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
      category: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      description: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      location: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      expenses: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      expensesCost: new FormControl('', Validators.compose(
        [Validators.required]
      ))
    });
  }

  ngOnInit(): void {
  }

  addArticleRequest(): void {
    this.httpClient.post(environment.endpointURL + 'add-article/provide-service/', {
      title: this.title,
      price: this.price,
      hourOrDay: this.pricingType,
      category: this.category,
      description: this.description,
      location: this.location,
      expenses: this.expenses,
      expCost: this.expensesCost,
      userId: this.userInfoService.getUserId()
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('title', res.title);
      localStorage.setItem('price', res.price);
      localStorage.setItem('hourOrDay', res.hourOrDay);
      localStorage.setItem('description', res.description);
      localStorage.setItem('location', res.location);
      localStorage.setItem('expenses', res.expenses);
      localStorage.setItem('expCost', res.expCost);
    });
  }
}
