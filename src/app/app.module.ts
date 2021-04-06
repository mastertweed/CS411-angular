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
import { UserInformationComponent } from './components/user-information/user-information.component';


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
    UserInformationComponent
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
