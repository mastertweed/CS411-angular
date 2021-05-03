import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { ZipCodes } from "../../../Shared/Models/zipcodes.model";
import { ZipCodesService } from "../../../core/Services/zipcodes.service";
import { PreferenceService } from "../../../core/Services/preference.service";
import { Results } from 'src/app/Shared/Models/results.model';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  zipcodes: ZipCodes[] = [];
  private zipcodeSub: Subscription;

  results: Results[] = [];
  private resultsSub: Subscription;

  constructor(public zipcodesService: ZipCodesService, private preferenceService: PreferenceService) {}

  ngOnInit() { 
    this.results = this.preferenceService.getResults()

  }

  onClick(result: Results) {
    console.log(result.city)
  }

  ngOnDestroy() {

  }

}
