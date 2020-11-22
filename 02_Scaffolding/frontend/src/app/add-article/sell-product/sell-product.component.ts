import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserInfoService} from '../../user-info.service';


interface Delivery {
  value: boolean;
  viewValue: string;
}
interface Category {
  name: string;
  id: number;
}

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.css']
})
export class SellProductComponent implements OnInit {

  articleType;
  title;
  category;
  price;
  description;
  location;
  delivery;
  deliverySpecs;

  addArticleForm: FormGroup;
  deliveryOptions: Delivery[] = [
    {value: true, viewValue: 'Yes'},
    {value: false, viewValue: 'No'}
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

  onSubmit(): void {

  }

  addArticleRequest(): void {
    this.httpClient.post(environment.endpointURL + 'add-article/sell-product/', {
      title: this.title,
      price: this.price,
      category: this.category,
      description: this.description,
      location: this.location,
      delivery: this.delivery,
      delSpec: this.deliverySpecs,
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
      localStorage.setItem('articleListId', res.articleListId);
    });
  }
}
