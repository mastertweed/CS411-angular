import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { ZipCodes } from "../../../Shared/Models/zipcodes.model";
import { ZipCodesService } from "../../../core/Services/zipcodes.service";
import { Housing } from "../../../Shared/Models/housing.model";
import { PreferenceService } from "../../../core/Services/preference.service";

@Component({
  selector: 'app-results-detail',
  templateUrl: './results-detail.component.html',
  styleUrls: ['./results-detail.component.css']
})
export class ResultsDetailComponent implements OnInit {

  panelOpenState = false;

  // zips = [54826, 94518, 91021, 46534]
  
  zipcodes: ZipCodes[] = [];
  private zipcodeSub: Subscription;

  results: Housing[] = [];
  private resultsSub: Subscription;

  constructor(public zipcodesService: ZipCodesService, private preferenceService: PreferenceService) {}

  ngOnInit() { 
    // this.zipcodeSub = this.zipcodesService.getZipCodesByZipUpdateListener()
    //     .subscribe((zipcodes: ZipCodes[]) => {
    //         this.zipcodes.push(zipcodes[0]);
    //     });

    // for (var zip of this.zips) {
    //   this.zipcodesService.getZipCodesByZip(zip);
    // }

    this.results = this.preferenceService.getResults()
    
  }

  ngOnDestroy() {
      // this.zipcodeSub.unsubscribe();
  }

}
