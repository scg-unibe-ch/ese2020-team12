import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  articleType;
  title;
  price;
  pricingType;
  description;
  location;
  sellOrLend;
  lendingStatus;
  delivery;
  deliverySpecs;
  expenses;
  expensesCost;

  addArticleForm: FormGroup;
  articleTypes: any = [ 'Product', 'Service'];
  pricingTypes: any = [ 'per hour', 'per day'];
  distribution: any = [ 'Sell', 'Lend'];
  lendingStates: any = [ 'Available', 'Lent'];
  deliveryOptions: any = [ 'Yes', 'No'];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
  ) {
    this.addArticleForm = this.formBuilder.group({
        articleType: new FormControl('', Validators.compose(
          [Validators.required]
        )),
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

    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  changeArticleType(e: any): void {
    this.articleType.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changePricingType(e: any): void {
    this.pricingType.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeDistroType(e: any): void {
    this.sellOrLend.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeLendingStatus(e: any): void {
    this.lendingStatus.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeDeliveryOption(e: any): void {
    this.delivery.setValue(e.target.value, {
      onlySelf: true
    });
  }

  /*
  sendForm(): void {
    this.httpClient.post(environment.endpointURL + 'user/signup', {
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
