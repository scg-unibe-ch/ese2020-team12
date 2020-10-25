import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';


interface Delivery {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.css']
})
export class SellProductComponent implements OnInit {

  articleType;
  title;
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
      description: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      location: new FormControl('', Validators.compose(
        [Validators.required]
      )),
      delivery: new FormControl(''),
      deliverySpecs: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

  }

  /*
  addArticleRequest(): void {
    this.httpClient.post(environment.endpointURL + 'user/add-article', {
      name: this.name,
      surname: this.surname,
      userName: this.username,
      email: this.email,
      street: this.street,
      houseNumber: this.houseNumber,
      place: this.city,
      postalCode: this.postalCode,
      password: this.password
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('name', res.name);
      localStorage.setItem('surname', res.surname);
      localStorage.setItem('userName', res.userName);
      localStorage.setItem('email', res.email);
      localStorage.setItem('street', res.street);
      localStorage.setItem('houseNumber', res.houseNumber);
      localStorage.setItem('place', res.place);
      localStorage.setItem('postalCode', res.postalCode);
      localStorage.setItem('password', res.password);
    });
  }
   */

}
