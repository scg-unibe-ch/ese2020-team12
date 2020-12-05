import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserInfoService} from '../user-info.service';
import {ArticleInfoService} from '../article-info.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public articleInfoService: ArticleInfoService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    public userInfoService: UserInfoService
  ) {
    this.editProfileForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      surname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(16)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ])),
      street: new FormControl(''),
      houseNumber: new FormControl(''),
      place: new FormControl(''),
      postalCode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]')
      ]))
    });
  }
  userToken: string;
  loggedIn = false;

  name;
  surname;
  username;
  email;
  street;
  houseNumber;
  place;
  postalCode;
  password;
  // balance;
  uploadedFile;
  /*
  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.username = localStorage.getItem('userName');
    this.email = localStorage.getItem('email');
    this.name = localStorage.getItem('name');
    this.surname = localStorage.getItem('surname');
    this.street = localStorage.getItem('street');
    this.houseNumber = localStorage.getItem('houseNumber');
    this.postalCode = localStorage.getItem('postalCode');
    this.place = localStorage.getItem('place');

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }
   */

  editProfileForm: FormGroup;

  ngOnInit(): void {
    this.userInfoService.checkUserStatus();
    this.getUserInfo();
    this.userInfoService.getUserFromBackend();
    setTimeout(() =>
      {
        this.articleInfoService.saveUserLendArticle(this.userInfoService.getUserId());
        this.articleInfoService.saveUserSellArticle(this.userInfoService.getUserId());
        this.articleInfoService.saveUserServiceArticle(this.userInfoService.getUserId());
      },
      1000);
  }

  getUserInfo(): void {
    this.email = this.userInfoService.getEmail();
    this.name = this.userInfoService.getName();
    this.surname = this.userInfoService.getSurname();
    this.street = this.userInfoService.getStreet();
    this.houseNumber = this.userInfoService.getHouseNumber();
    this.postalCode = this.userInfoService.getPostalCode();
    this.place = this.userInfoService.getPlace();
    // this.balance = this.userInfoService.getBalance();
  }

  sendForm(): void {
    this.httpClient.put(environment.endpointURL + 'user/profile/' + this.userInfoService.getUserId(), {
      name: this.name,
      surname: this.surname,
      userName: this.username,
      email: this.email,
      street: this.street,
      houseNumber: this.houseNumber,
      place: this.place,
      postalCode: this.postalCode,
      // balance: this.balance,
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('name', res.name);
      localStorage.setItem('surname', res.surname);
      localStorage.setItem('username', res.userName);
      localStorage.setItem('email', res.email);
      localStorage.setItem('street', res.street);
      localStorage.setItem('houseNumber', res.houseNumber);
      localStorage.setItem('place', res.place);
      localStorage.setItem('postalCode', res.postalCode);
      // localStorage.setItem('balance', res.balance);
    });
  }

  onFileChange(event): void {
    this.uploadedFile = event.target.files[0];
    }

  sendPicture(): void {
    const formData = new FormData();
    formData.append('image', this.uploadedFile);
    // tslint:disable-next-line:max-line-length
    this.httpClient.post(environment.endpointURL + 'user/profilephoto/' + this.userInfoService.getUserId(), formData).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('profilephoto', res.profilephoto);
    });
  }

  moreSellInfos(id: number): void{
    this.articleInfoService.saveSellArticleTemp(id);
    setTimeout(() =>
      {
        this.router.navigate(['/article-page']);
      },
      1000);
  }
  moreLendInfos(id: number): void{
    this.articleInfoService.saveLendArticleTemp(id);
    setTimeout(() =>
      {
        this.router.navigate(['/article-page-lend']);
      },
      1000);
  }
  moreServiceInfos(id: number): void{
    this.articleInfoService.saveServiceArticleTemp(id);
    setTimeout(() =>
      {
        this.router.navigate(['/article-page-service']);
      },
      1000);
  }

  deleteSell(id: any): void {
    this.articleInfoService.deleteSellProduct(id);
    setTimeout(() =>
      {
        this.ngOnInit();
      },
      1000);
  }

  deleteLend(id: any): void {
    this.articleInfoService.deleteLendProduct(id);
    setTimeout(() =>
      {
        this.ngOnInit();
      },
      1000);
  }

  deleteService(id: any): void {
    this.articleInfoService.deleteService(id);
    setTimeout(() =>
      {
        this.ngOnInit();
      },
      1000);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  textOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)){
      return false;
    }
    return true;
  }
}
