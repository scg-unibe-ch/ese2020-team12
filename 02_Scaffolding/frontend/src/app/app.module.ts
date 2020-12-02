import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Imports from original scaffoling -->
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { TodoListComponent } from './todo-list/todo-list.component';
// import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
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
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { CategoriesComponent } from './categories/categories.component';
import { ServicesComponent } from './services/services.component';
import { ClothesShoesComponent } from './categories/clothes-shoes/clothes-shoes.component';
import { ElectronicsComponent } from './categories/electronics/electronics.component';
import { HouseholdGardenComponent } from './categories/household-garden/household-garden.component';
import { RealestateComponent } from './categories/realestate/realestate.component';
import { SportComponent } from './categories/sport/sport.component';
import { VehiclesComponent } from './categories/vehicles/vehicles.component';
import { BabysittingComponent } from './services/babysitting/babysitting.component';
import { CarpoolComponent } from './services/carpool/carpool.component';
import { GardenLawnComponent } from './services/garden-lawn/garden-lawn.component';
import { HouseholdComponent } from './services/household/household.component';
import { PrivatelessonsComponent } from './services/privatelessons/privatelessons.component';
import { ReparationsComponent } from './services/reparations/reparations.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { MatRadioModule } from '@angular/material/radio';
import { ArticlePageComponent } from './article-page/article-page.component';
import { SellproductPageComponent } from './sellproduct-page/sellproduct-page.component';
import { ArticlePageLendComponent } from './article-page-lend/article-page-lend.component';
import { ArticlePageServiceComponent } from './article-page-service/article-page-service.component';
import { LendproductPageComponent } from './lendproduct-page/lendproduct-page.component';
import { SellservicePageComponent } from './sellservice-page/sellservice-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BalanceComponent } from './balance/balance.component';
import { TermsofserviceComponent } from './termsofservice/termsofservice.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { BottombarComponent } from './bottombar/bottombar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import {MatStepperModule} from "@angular/material/stepper";
import { FAQComponent } from './faq/faq.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { UserInfoComponent } from './user-info/user-info.component';


@NgModule({
  declarations: [
    AppComponent,
    // TodoListComponent,
    // TodoItemComponent,
    UserLoginComponent,
    TopbarComponent,
    SignupComponent,
    HomeComponent,
    ProfileComponent,
    PasswordValidatorDirective,
    AddArticleComponent,
    SellProductComponent,
    LendProductComponent,
    ProvideServiceComponent,
    CategoriesComponent,
    ServicesComponent,
    ClothesShoesComponent,
    ElectronicsComponent,
    HouseholdGardenComponent,
    RealestateComponent,
    SportComponent,
    VehiclesComponent,
    BabysittingComponent,
    CarpoolComponent,
    GardenLawnComponent,
    HouseholdComponent,
    PrivatelessonsComponent,
    ReparationsComponent,
    SearchResultsComponent,
    ArticlePageComponent,
    SellproductPageComponent,
    ArticlePageLendComponent,
    ArticlePageServiceComponent,
    LendproductPageComponent,
    SellservicePageComponent,
    BalanceComponent,
    TermsofserviceComponent,
    BottombarComponent,
    ShoppingcartComponent,
    FAQComponent,
    ChangepasswordComponent,
    AdminpageComponent,
    UserInfoComponent,
  ],
    imports: [
        MatSnackBarModule,
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
        FlexLayoutModule,
        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: 'signup', component: SignupComponent},
            {path: 'profile', component: ProfileComponent},
            {path: 'add-article', component: AddArticleComponent},
            {path: 'add-article/sell-product', component: SellProductComponent},
            {path: 'add-article/lend-product', component: LendProductComponent},
            {path: 'add-article/provide-service', component: ProvideServiceComponent},
            {path: 'categories/clothes-shoes', component: ClothesShoesComponent},
            {path: 'categories/electronics', component: ElectronicsComponent},
            {path: 'categories/household-garden', component: HouseholdGardenComponent},
            {path: 'categories/realestate', component: RealestateComponent},
            {path: 'categories/sport', component: SportComponent},
            {path: 'categories/vehicles', component: VehiclesComponent},
            {path: 'services/babysitting', component: BabysittingComponent},
            {path: 'services/carpool', component: CarpoolComponent},
            {path: 'services/garden-lawn', component: GardenLawnComponent},
            {path: 'services/household', component: HouseholdComponent},
            {path: 'services/privatelessons', component: PrivatelessonsComponent},
            {path: 'services/reparations', component: ReparationsComponent},
            {path: 'search-results', component: SearchResultsComponent},
            {path: 'article-page', component: ArticlePageComponent},
            {path: 'sellproduct-page', component: SellproductPageComponent},
            {path: 'lendproduct-page', component: LendproductPageComponent},
            {path: 'sellservice-page', component: SellservicePageComponent},
            {path: 'article-page-lend', component: ArticlePageLendComponent},
            {path: 'article-page-service', component: ArticlePageServiceComponent},
            {path: 'balance', component: BalanceComponent},
            {path: 'termsofservice', component: TermsofserviceComponent},
            {path: 'shoppingcart', component: ShoppingcartComponent},
            {path: 'faq', component: FAQComponent},
            {path: 'changepassword', component: ChangepasswordComponent},
            {path: 'adminpage', component: AdminpageComponent},
            {path: 'user-info', component: UserInfoComponent}
        ]),
        FormsModule,
        MatSelectModule,
        MatGridListModule,
        MatRadioModule,
        AngularSvgIconModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
        MatStepperModule
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
