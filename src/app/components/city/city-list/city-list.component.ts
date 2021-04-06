import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { City } from "../../../Shared/Models/city.model";
import { CityService } from "../../../core/Services/city.service";

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit, OnDestroy {

  citys: City[] = [];
  private citySub: Subscription;

  constructor(public cityService: CityService) {}

  ngOnInit() { 
    this.cityService.getCity();
    this.citySub = this.cityService.getCityUpdateListener()
        .subscribe((citys: City[]) => {
            this.citys = citys;
        });
  }

  ngOnDestroy() {
      this.citySub.unsubscribe();
  }

}
