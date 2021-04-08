import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { Census } from "../../../Shared/Models/census.model";
import { CensusService } from "../../../core/Services/census.service";

@Component({
  selector: 'app-census-list',
  templateUrl: './census-list.component.html',
  styleUrls: ['./census-list.component.css']
})
export class CensusListComponent implements OnInit, OnDestroy {

  censuses: Census[] = [];
  private censusSub: Subscription;

  constructor(public censusService: CensusService) {}

  ngOnInit() { 
    this.censusService.getCensus();
    this.censusSub = this.censusService.getCensusUpdateListener()
        .subscribe((censuses: Census[]) => {
            this.censuses = censuses;
        });
  }

  ngOnDestroy() {
      this.censusSub.unsubscribe();
  }

}
