import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { ZipCodes } from "../../../Shared/Models/zipcodes.model";
import { ZipCodesService } from "../../../core/Services/zipcodes.service";
import { Housing } from "../../../Shared/Models/housing.model";
import { PreferenceService } from "../../../core/Services/preference.service";

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  zipcodes: ZipCodes[] = [];
  private zipcodeSub: Subscription;

  results: Housing[] = [];
  private resultsSub: Subscription;

  constructor(public zipcodesService: ZipCodesService, private preferenceService: PreferenceService) {}

  ngOnInit() { 
    // this.zipcodesService.getZipCodesByZip(1534);
    // this.zipcodeSub = this.zipcodesService.getZipCodesByZipUpdateListener()
    //     .subscribe((zipcodes: ZipCodes[]) => {
    //       this.zipcodes.push(zipcodes[0]);
    //     });

    this.results = this.preferenceService.getResults()

    // this.resultsSub = this.preferenceService.getResultsUpdateListener()
    //   .subscribe((results: Housing[]) => {
    //       this.results = results;
    //   });

  }

  ngOnDestroy() {
      // this.zipcodeSub.unsubscribe();
    // this.resultsSub.unsubscribe();
  }

}
