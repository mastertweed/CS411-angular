import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { ZipCodes } from "../../../Shared/Models/zipcodes.model";
import { ZipCodesService } from "../../../core/Services/zipcodes.service";

@Component({
  selector: 'app-zipcode-list',
  templateUrl: './zipcode-list.component.html',
  styleUrls: ['./zipcode-list.component.css']
})
export class ZipcodeListComponent implements OnInit, OnDestroy {

  zipcodes: ZipCodes[] = [];
  private zipcodeSub: Subscription;

  constructor(public zipcodesService: ZipCodesService) {}

  ngOnInit() { 
    this.zipcodesService.getZipCodes();
    this.zipcodeSub = this.zipcodesService.getZipCodesUpdateListener()
        .subscribe((zipcodes: ZipCodes[]) => {
            this.zipcodes = zipcodes;
        });
  }

  ngOnDestroy() {
      this.zipcodeSub.unsubscribe();
  }

}
