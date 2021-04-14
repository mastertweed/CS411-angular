import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { ZipCodes } from "../../../Shared/Models/zipcodes.model";
import { ZipCodesService } from "../../../core/Services/zipcodes.service";

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  zipcodes: ZipCodes[] = [];
  private zipcodeSub: Subscription;

  constructor(public zipcodesService: ZipCodesService) {}

  ngOnInit() { 
    // this.zipcodesService.getZipCodesByZip(1534);
    this.zipcodeSub = this.zipcodesService.getZipCodesByZipUpdateListener()
        .subscribe((zipcodes: ZipCodes[]) => {
          this.zipcodes.push(zipcodes[0]);
        });
  }

  ngOnDestroy() {
      this.zipcodeSub.unsubscribe();
  }

}
