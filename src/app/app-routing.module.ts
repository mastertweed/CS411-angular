import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './components/users/user-list/user-list.component';
import { IncentivesListComponent } from "./components/incentives/incentives-list/incentives-list.component";
import { HousingListComponent } from "./components/housing/housing-list/housing-list.component";
import { PrefersListComponent } from "./components/prefers/prefers-list/prefers-list.component";
import { PreferenceFormComponent } from "./components/preference-form/preference-form.component";
import { LoginComponent } from "./components/authentication/login/login.component";
import { ZipcodeListComponent } from "./components/zipcodes/zipcode-list/zipcode-list.component";
import { CensusListComponent } from "./components/census/census-list/census-list.component";
import { WeatherListComponent } from "./components/weather/weather-list/weather-list.component";
import { UserInformationListComponent } from "./components/user-information/user-information-list/user-information-list.component";
import { ResultsPageComponent } from "./components/results/results-page/results-page.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "user", component: UserListComponent },
  { path: "incentives", component: IncentivesListComponent },
  { path: "housing", component: HousingListComponent },
  { path: "prefers", component: PrefersListComponent },
  { path: "preference", component: PreferenceFormComponent },
  { path: "zipcode", component: ZipcodeListComponent },
  { path: "census", component: CensusListComponent },
  { path: "weather", component: WeatherListComponent },
  { path: "userinfo", component: UserInformationListComponent },
  { path: "login", component: LoginComponent },
  { path: "results", component: ResultsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
