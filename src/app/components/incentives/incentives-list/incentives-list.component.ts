import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { Incentives } from "../../../Shared/Models/incentives.model";
import { IncentivesService } from "../../../core/Services/incentives.service";

@Component({
  selector: 'app-incentives-list',
  templateUrl: './incentives-list.component.html',
  styleUrls: ['./incentives-list.component.css']
})
export class IncentivesListComponent implements OnInit, OnDestroy {

  incentives: Incentives[] = [];
  private incentivesSub: Subscription;

  constructor(public incentivesService: IncentivesService) {}

  ngOnInit() { 
      this.incentivesService.deleteIncentive("A", "B").subscribe(res => {
	});
      this.incentivesService.getIncentives().subscribe(res => {
	  this.incentives = res;
      });

    //this.incentivesService.getUsers();
    //this.incentivesSub = this.incentivesService.getUserUpdateListener()
    //    .subscribe((incentives: Incentives[]) => {
    //        this.incentives = incentives;
    //    });
  }

  ngOnAdd() {
    // TODO: Get State, City, Description and Requirements from HTML form
      this.incentivesService.addIncentive("A", "B", "C", "D").subscribe(res => {
	});
  }
  ngOnDelete() {
    // TODO: Get State, City from HTML form
      this.incentivesService.deleteIncentive("A", "B").subscribe(res => {
	});
  }

  ngOnDestroy() {
      this.incentivesSub.unsubscribe();
  }

}
