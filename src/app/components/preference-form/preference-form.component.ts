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
      return;
    }
    this.maxdistvalue = form.value.maxDist
    this.minCostValue = form.value.minCost
    this.maxCostValue = form.value.maxCost
    this.avgAge = form.value.avgAge
    this.bedrooms1 = form.value.checkbox1
    this.bedrooms2 = form.value.checkbox2
    this.bedrooms3 = form.value.checkbox3
    this.bedrooms4 = form.value.checkbox4
    this.bedrooms5 = form.value.checkbox5
    this.singlefamily = form.value.singlefamily
    this.minTempValue = form.value.minTemp
    this.maxTempValue = form.value.maxTemp

    this.preferenceService.getPreferenceResults(this.maxdistvalue,this.minCostValue,this.maxCostValue,this.avgAge,
      this.bedrooms1,this.bedrooms2,this.bedrooms3,this.bedrooms4,this.bedrooms5,
      this.singlefamily,this.minTempValue,this.maxTempValue)
  }

  ngOnDestroy() {
    this.resultsSub.unsubscribe();
  }
}
