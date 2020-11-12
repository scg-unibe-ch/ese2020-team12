import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Imports from original scaffoling -->
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
//import { TodoListComponent } from './todo-list/todo-list.component';
//import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthInterceptor } from './auth/auth.interceptor';
// until here <--

import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordValidatorDirective } from './signup/password-validator.directive';
import { AddArticleComponent } from './add-article/add-article.component';
import { SellProductComponent } from './add-article/sell-product/sell-product.component';
import { LendProductComponent } from './add-article/lend-product/lend-product.component';
import { ProvideServiceComponent } from './add-article/provide-service/provide-service.component';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';




@NgModule({
  declarations: [
    AppComponent,
    //TodoListComponent,
    //TodoItemComponent,
    UserLoginComponent,
    TopbarComponent,
    SignupComponent,
    HomeComponent,
    ProfileComponent,
    PasswordValidatorDirective,
    AddArticleComponent,
    SellProductComponent,
    LendProductComponent,
    ProvideServiceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'add-article', component: AddArticleComponent},
      {path: 'add-article/sell-product', component: SellProductComponent},
      {path: 'add-article/lend-product', component: LendProductComponent},
      {path: 'add-article/provide-service', component: ProvideServiceComponent},
    ]),
    FormsModule,
    MatSelectModule,
    MatGridListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
