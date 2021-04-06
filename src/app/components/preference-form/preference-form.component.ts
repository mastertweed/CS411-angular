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
  avgAge = 0;
  bedrooms: number[] = [];
  minTempValue = 0;
  maxTempValue = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitPrefer(form: NgForm) {
    console.log("Submitted");
    if (form.invalid) {
      return;
    }
    this.maxdistvalue = form.value.maxDist
    this.maxCostValue = form.value.maxCost
    this.avgCostValue = form.value.avgCost
    this.avgAge = form.value.avgAge
    this.minTempValue = form.value.minTemp
    this.maxTempValue = form.value.maxTemp

    this.bedrooms = []
    if (form.value.checkbox1 == true){ this.bedrooms.push(1) }
    if (form.value.checkbox2 == true){ this.bedrooms.push(2) }
    if (form.value.checkbox3 == true){ this.bedrooms.push(3) }
    if (form.value.checkbox4 == true){ this.bedrooms.push(4) }
    if (form.value.checkbox5 == true){ this.bedrooms.push(5) }
    if (form.value.checkbox6 == true){ this.bedrooms.push(6) }

    console.log(this.bedrooms);
  }
}
