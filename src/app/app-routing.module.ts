import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CityListComponent } from "../app/components/city/city-list/city-list.component";
import { UserListComponent } from './components/users/user-list/user-list.component';
import { IncentivesListComponent } from "./components/incentives/incentives-list/incentives-list.component";
import { HousingListComponent } from "./components/housing/housing-list/housing-list.component";
import { PrefersListComponent } from "./components/prefers/prefers-list/prefers-list.component";
import { PreferenceFormComponent } from "./components/preference-form/preference-form.component";
import { LoginComponent } from "./components/login/login.component";
import { UserInformationCreateComponent } from "./components/user-information/user-information-create/user-information-create.component";

const routes: Routes = [
  { path: "", component: UserListComponent },
  { path: "user", component: UserListComponent },
  { path: "city", component: CityListComponent },
  { path: "incentives", component: IncentivesListComponent },
  { path: "housing", component: HousingListComponent },
  { path: "prefers", component: PrefersListComponent },
  { path: "preference", component: PreferenceFormComponent },
  { path: "user-info", component: UserInformationCreateComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
