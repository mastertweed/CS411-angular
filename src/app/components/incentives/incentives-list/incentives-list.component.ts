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
    this.incentivesService.getIncentives();
    this.incentivesSub = this.incentivesService.getIncentivesUpdateListener()
      .subscribe((incentives: Incentives[]) => {
          this.incentives = incentives;
      });
  }

  ngOnAdd(form) {
      this.incentivesService.addIncentive(form.state, form.city, form.description, form.requirements)
  }

  ngOnDelete(form) {
    this.incentivesService.deleteIncentive(form.state, form.city).subscribe(res => {
	  });
  }

  ngOnDestroy() {
    this.incentivesSub.unsubscribe();
  }

}
