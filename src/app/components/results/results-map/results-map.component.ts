import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { PreferenceService } from "../../../core/Services/preference.service";
import { Housing } from "../../../Shared/Models/housing.model";
import { ZipCodes } from "../../../Shared/Models/zipcodes.model";
import { ZipCodesService } from "../../../core/Services/zipcodes.service";
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { ViewChild } from '@angular/core'
import { Results } from 'src/app/Shared/Models/results.model';
import { ResultsService } from 'src/app/core/Services/results.service';

@Component({
  selector: 'app-results-map',
  templateUrl: './results-map.component.html',
  styleUrls: ['./results-map.component.css']
})
export class ResultsMapComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap  
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow	 

	// Get zipcodes
	zipcodes: ZipCodes[] = [];
	private zipcodesSub: Subscription;

	// Get all results return from preference query
	results: Results[] = [];
	private resultsSub: Subscription;

	// Get current result under detail
	result: Results;
	private resultSub: Subscription;

	zoom = 3
	center: google.maps.LatLngLiteral
	options: google.maps.MapOptions = {
		zoomControl: true,
		scrollwheel: false,
		disableDoubleClickZoom: true,
		mapTypeId: 'hybrid',
		maxZoom: 12,
		minZoom: 1,
	}

	markers = [];
	infoContent = '';

  constructor(public zipcodesService: ZipCodesService, 
	private preferenceService: PreferenceService,
	private resultsService: ResultsService) { }

  ngOnInit() {

	// Starting center
	this.center = {
		lat: 37.09024,
		lng: -95.712891,
	}	
	
	// Get results data from preference search
	this.results = this.preferenceService.getResults()

	// Get current detail result and subscribe to changes
	this.result = this.resultsService.getCurrentResult();
    this.resultSub = this.resultsService.getCurrentResultUpdateListener()
        .subscribe((result: Results) => {
            this.result = result;
			this.map.googleMap.setCenter({lat: this.result.latitude, lng: this.result.longitude})
			this.map.googleMap.setZoom(10)
        });

	// Create markers for each result/location
	for(var res of this.results){
	    this.markers.push({
		position: {
		   lat: res.latitude,
		   lng: res.longitude,
		},
		label: {
		   color: 'red',
		   text: 'Marker label',
		},
		title: res.city + ', ' + res.state,
		info: "Score = " + res.score.toPrecision(5),
		options: {
		    //animation: google.maps.Animation.BOUNCE,
		}	
	    })
	}
  }

	ngAfterViewInit(){
		// Fit map to markers
		const bounds = this.getBounds(this.markers);
		this.map.googleMap.fitBounds(bounds);
	}

	ngOnDestroy() {
		this.resultSub.unsubscribe();
	}

	// CUSTOM FUNCTIONS
	// 
	openInfo(marker: MapMarker, content) {
		this.infoContent = content
		this.infoWindow.open(marker)
		this.map.googleMap.setCenter(marker.getPosition())
		this.map.googleMap.setZoom(10)
	}

	onResetClick() {
		const bounds = this.getBounds(this.markers);
		this.map.googleMap.fitBounds(bounds);
	}

	getBounds(markers){
		let north;
		let south;
		let east;
		let west;

		for (const marker of markers){
			// set the coordinates to marker's lat and lng on the first run.
			// if the coordinates exist, get max or min depends on the coordinates.
			north = north !== undefined ? Math.max(north, marker.position.lat) : marker.position.lat;
			south = south !== undefined ? Math.min(south, marker.position.lat) : marker.position.lat;
			east = east !== undefined ? Math.max(east, marker.position.lng) : marker.position.lng;
			west = west !== undefined ? Math.min(west, marker.position.lng) : marker.position.lng;
		};

		const bounds = { north, south, east, west };

		return bounds;
	}
  
}


