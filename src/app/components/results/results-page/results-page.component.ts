import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DetailsService } from 'src/app/core/Services/details.service';
import { PreferenceService } from 'src/app/core/Services/preference.service';
import { ResultsService } from 'src/app/core/Services/results.service';
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

	// Get current result under detail
	result: Results;
	private resultSub: Subscription;

  // Get details on result location
  details: any;
  private detailsSub: Subscription;

  incentives: any;
  showIncentives = false;

  constructor(public zipcodesService: ZipCodesService, 
    private preferenceService: PreferenceService,
    private resultsService: ResultsService,
    private detailsService: DetailsService) {}

  ngOnInit() { 
    this.results = this.preferenceService.getResults()

    // Get current detail result and subscribe to changes
    this.result = this.resultsService.getCurrentResult();
    this.resultSub = this.resultsService.getCurrentResultUpdateListener()
      .subscribe((result: Results) => {
        this.result = result;
      });

    this.detailsSub = this.detailsService.getDetailsUpdateListener()
      .subscribe((details: any) => {
        this.details = details;
        this.incentives = {
          description: "",
          requirements: "",
        }

        for (let i = 0; i < this.details.length; i++) {
          if (this.details[i].description) {
            this.incentives = this.details[i]
            this.showIncentives = true;
            console.log("found incentives")
            console.log(this.details)
            console.log(this.details[i])
          } else {
            this.showIncentives = false;
          }
        }

      });
  }

  onClick(index) {
    this.detailsService.getDetailsSingle(
      this.results[index].city,
      this.results[index].state,
      this.results[index].county
      )

    this.currentPick = this.results[index];
    this.center.lat = this.results[index].latitude
    this.center.lng = this.results[index].longitude
    this.zoom = 8

    this.resultsService.setCurrentResult(this.results[index])
  }

	ngOnDestroy() {
		this.resultSub.unsubscribe();
	}
}
