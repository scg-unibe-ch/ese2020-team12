import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  articleType;
  title;
  price;
  pricePer;
  description;
  location;
  sellOrLend;
  lendingStatus;
  deliveryPossible;
  deliveryCost;
  expenses;
  expensesCost;

  addArticleForm: FormGroup;
  articleTypes: any = [ 'Product', 'Service'];

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

    })
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }


  changeType(e) {
    this.articleType.setValue(e.target.value, {
      onlySelf: true
    });
  }
}
