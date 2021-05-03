import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PreferenceService } from 'src/app/core/Services/preference.service';
import { ZipCodesService } from 'src/app/core/Services/zipcodes.service';
import { Results } from 'src/app/Shared/Models/results.model';
import { ZipCodes } from 'src/app/Shared/Models/zipcodes.model';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css']
})
export class ResultsPageComponent implements OnInit, OnDestroy {

  currentPick: Results;

  center: google.maps.LatLngLiteral = {lat: 40, lng: -20};
  zoom = 4;

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  zipcodes: ZipCodes[] = [];
  private zipcodeSub: Subscription;

  results: Results[] = [];
  private resultsSub: Subscription;

  constructor(public zipcodesService: ZipCodesService, private preferenceService: PreferenceService) {}

  ngOnInit() { 
    this.results = this.preferenceService.getResults()
    if (this.results) {
      this.center.lat = this.results[0].latitude
      this.center.lng = this.results[0].longitude
      this.zoom = 8
    }
  }

  onClick(index) {
    console.log(this.results[index].city)
    this.currentPick = this.results[index];
    this.center.lat = this.results[index].latitude
    this.center.lng = this.results[index].longitude
    this.zoom = 8

    console.log(this.center.lng)
    console.log(this.center.lat)
  }

  ngOnDestroy() {

  }


}
