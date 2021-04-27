import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from "@angular/forms";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./components/header/header.component";
import { HousingListComponent } from './components/housing/housing-list/housing-list.component';
import { IncentivesListComponent } from './components/incentives/incentives-list/incentives-list.component';
import { PreferenceFormComponent } from './components/preference-form/preference-form.component';
import { PrefersListComponent } from './components/prefers/prefers-list/prefers-list.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { ZipcodeListComponent } from './components/zipcodes/zipcode-list/zipcode-list.component';
import { CensusListComponent } from './components/census/census-list/census-list.component';
import { WeatherListComponent } from './components/weather/weather-list/weather-list.component';
import { UserInformationListComponent } from './components/user-information/user-information-list/user-information-list.component';
import { UserInformationCreateComponent } from './components/user-information/user-information-create/user-information-create.component';
import { ResultsListComponent } from './components/results/results-list/results-list.component';
import { ResultsMapComponent } from './components/results/results-map/results-map.component';
import { ResultsDetailComponent } from './components/results/results-detail/results-detail.component';
import { ResultsPageComponent } from './components/results/results-page/results-page.component';
import { AuthInterceptor } from './components/authentication/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HousingListComponent,
    IncentivesListComponent,
    PreferenceFormComponent,
    PrefersListComponent,
    UserListComponent,
    LoginComponent,
    ZipcodeListComponent,
    CensusListComponent,
    WeatherListComponent,
    UserInformationListComponent,
    UserInformationCreateComponent,
    ResultsListComponent,
    ResultsMapComponent,
    ResultsDetailComponent,
    ResultsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatSliderModule,
    MatCheckboxModule,
    MatGridListModule,
    MatExpansionModule,
    MatMenuModule,
    GoogleMapsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
