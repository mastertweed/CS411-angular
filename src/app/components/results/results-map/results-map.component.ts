import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { PreferenceService } from "../../../core/Services/preference.service";
import { Housing } from "../../../Shared/Models/housing.model";
import { ZipCodes } from "../../../Shared/Models/zipcodes.model";
import { ZipCodesService } from "../../../core/Services/zipcodes.service";
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { ViewChild } from '@angular/core'

@Component({
  selector: 'app-results-map',
  templateUrl: './results-map.component.html',
  styleUrls: ['./results-map.component.css']
})
export class ResultsMapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap  
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow	 

  zipcodes: ZipCodes[] = [];
  private zipcodesSub: Subscription;

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
  results: any[] = [];
  private resultsSub: Subscription;

  markers = [];
  infoContent = '';
  constructor(public zipcodesService: ZipCodesService, private preferenceService: PreferenceService) { }

  ngOnInit() {

	this.center = {
		lat: 37.09024,
		lng: -95.712891,
	}	
	//this.results = this.zipcodesService.getZipCodes()
	this.results = this.preferenceService.getResults()
	
	console.log(this.results)
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
		info: "Marker Info \n SOmething on line 2",
		options: {
		    //animation: google.maps.Animation.BOUNCE,
		}	
	    })
	}
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.infoWindow.open(marker)
  }
  
}


