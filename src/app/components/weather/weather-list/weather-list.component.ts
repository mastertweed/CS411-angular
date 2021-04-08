import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { Weather } from "../../../Shared/Models/weather.model";
import { WeatherService } from "../../../core/Services/weather.service";

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit, OnDestroy {

  weathers: Weather[] = [];
  private weatherSub: Subscription;

  constructor(public weatherService: WeatherService) {}

  ngOnInit() { 
    this.weatherService.getWeather();
    this.weatherSub = this.weatherService.getWeatherUpdateListener()
        .subscribe((weathers: Weather[]) => {
            this.weathers = weathers;
        });
  }

  ngOnDestroy() {
      this.weatherSub.unsubscribe();
  }

}
