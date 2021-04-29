import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { UserPreference } from "../../Shared/Models/userpreference.model";
import { Housing } from "../../Shared/Models/housing.model";
import { PreferenceService } from "../../core/Services/preference.service";

@Component({
  selector: 'app-preference-form',
  templateUrl: './preference-form.component.html',
  styleUrls: ['./preference-form.component.css']
})
export class PreferenceFormComponent implements OnInit, OnDestroy {

  maxdistvalue = 0;
  minCostValue = 0;
  maxCostValue = 0;
  avgAge = 0;
  bedrooms1 = 0;
  bedrooms2 = 0;
  bedrooms3 = 0;
  bedrooms4 = 0;
  bedrooms5 = 0;
  singlefamily = 0;
  minTempValue = 0;
  maxTempValue = 0;
  zipcode = 0;

  results: Housing[] = [];
  private resultsSub: Subscription;

  constructor(public preferenceService: PreferenceService) { }

  ngOnInit() { 
    this.resultsSub = this.preferenceService.getResultsUpdateListener()
        .subscribe((results: Housing[]) => {
            this.results = results;
        });
  }

  onSubmitPrefer(form: NgForm) {
    console.log("Submitted");
    if (form.invalid) {
      console.log("Invalid Form");
      return;
    }
    this.maxdistvalue = form.value.maxDist
    this.minCostValue = form.value.minCost
    this.maxCostValue = form.value.maxCost
    this.avgAge = form.value.avgAge
    if (form.value.checkbox1 == true) { this.bedrooms1 = 1 }
    if (form.value.checkbox2 == true) { this.bedrooms2 = 1 }
    if (form.value.checkbox3 == true) { this.bedrooms3 = 1 }
    if (form.value.checkbox4 == true) { this.bedrooms4 = 1 }
    if (form.value.checkbox5 == true) { this.bedrooms5 = 1 }
    if (form.value.singlefamily == true) { this.singlefamily = 1 }

    this.minTempValue = form.value.minTemp
    this.maxTempValue = form.value.maxTemp

    this.zipcode = form.value.zipCode

    this.preferenceService.getPreferenceResults(this.maxdistvalue,this.zipcode, this.minCostValue,this.maxCostValue, this.avgAge,
      this.bedrooms1,this.bedrooms2,this.bedrooms3,this.bedrooms4,this.bedrooms5,
      this.singlefamily,this.minTempValue,this.maxTempValue)
  }

  ngOnDestroy() {
    this.resultsSub.unsubscribe();
  }
}
