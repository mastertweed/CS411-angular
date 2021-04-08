import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from "@angular/forms";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./components/header/header.component";
import { CityListComponent } from './components/city/city-list/city-list.component';
import { HousingListComponent } from './components/housing/housing-list/housing-list.component';
import { IncentivesListComponent } from './components/incentives/incentives-list/incentives-list.component';
import { PreferenceFormComponent } from './components/preference-form/preference-form.component';
import { PrefersListComponent } from './components/prefers/prefers-list/prefers-list.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { LoginComponent } from './components/login/login.component';
import { ZipcodeListComponent } from './components/zipcodes/zipcode-list/zipcode-list.component';
import { CensusListComponent } from './components/census/census-list/census-list.component';
import { WeatherListComponent } from './components/weather/weather-list/weather-list.component';
import { UserInformationListComponent } from './components/user-information/user-information-list/user-information-list.component';
import { UserInformationCreateComponent } from './components/user-information/user-information-create/user-information-create.component';

>>>>>>> fc1ef5a488785e6d7393c0241cedd09575fe8a78

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CityListComponent,
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
    UserInformationCreateComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
