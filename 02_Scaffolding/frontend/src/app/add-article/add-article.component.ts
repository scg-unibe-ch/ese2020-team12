import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


interface ArticleType{
  text: string;
  link: string;
}

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  articleType;

  articleTypes: ArticleType[] = [
    {text: 'sell a product', link: '/add-article/sell-product'},
    {text: 'lend a product', link: '/add-article/lend-product'},
    {text: 'provide a service', link: '/add-article/provide-service'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
  ) {
    this.articleType = new FormControl('', Validators.compose([Validators.required]));
  }

  ngOnInit(): void {
  }

  getArticleTypeLink(): string {
    return this.articleType;
  }

  /*
  // only copy-pasted method from the signupForm, needs to be updated
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
