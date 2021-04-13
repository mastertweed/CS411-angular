import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CityListComponent } from "../app/components/city/city-list/city-list.component";
import { UserListComponent } from './components/users/user-list/user-list.component';
import { IncentivesListComponent } from "./components/incentives/incentives-list/incentives-list.component";
import { HousingListComponent } from "./components/housing/housing-list/housing-list.component";
import { PrefersListComponent } from "./components/prefers/prefers-list/prefers-list.component";
import { PreferenceFormComponent } from "./components/preference-form/preference-form.component";
import { LoginComponent } from "./components/login/login.component";
import { ZipcodeListComponent } from "./components/zipcodes/zipcode-list/zipcode-list.component";
import { CensusListComponent } from "./components/census/census-list/census-list.component";
import { WeatherListComponent } from "./components/weather/weather-list/weather-list.component";
import { UserInformationCreateComponent } from "./components/user-information/user-information-create/user-information-create.component";
import { ResultsPageComponent } from "./components/results/results-page/results-page.component";

const routes: Routes = [
  { path: "", component: UserListComponent },
  { path: "user", component: UserListComponent },
  { path: "city", component: CityListComponent },
  { path: "incentives", component: IncentivesListComponent },
  { path: "housing", component: HousingListComponent },
  { path: "prefers", component: PrefersListComponent },
  { path: "preference", component: PreferenceFormComponent },
  { path: "zipcode", component: ZipcodeListComponent },
  { path: "census", component: CensusListComponent },
  { path: "weather", component: WeatherListComponent },
  { path: "user-info", component: UserInformationCreateComponent },
  { path: "login", component: LoginComponent },
  { path: "results", component: ResultsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
