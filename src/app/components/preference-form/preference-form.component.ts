import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-preference-form',
  templateUrl: './preference-form.component.html',
  styleUrls: ['./preference-form.component.css']
})
export class PreferenceFormComponent implements OnInit {

  maxdistvalue = 0;
  maxCostValue = 0;
  avgCostValue = 0;
  minTempValue = 0;
  maxTempValue = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitPrefer(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.maxdistvalue = form.value.maxDist
    this.maxCostValue = form.value.maxCost
    this.avgCostValue = form.value.avgCost
    this.minTempValue = form.value.minTemp
    this.maxTempValue = form.value.maxTemp
  }
}
