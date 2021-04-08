import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { Weather } from "../../Shared/Models/weather.model";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class WeatherService {
    baseURL: string = "http://sp21-cs411-04.cs.illinois.edu:3000/";
    private weathers: Weather[] = [];
    private weatherUpdated = new Subject<Weather[]>();

    constructor(private http: HttpClient) {}

    getWeather() {
        this.http.get<Weather[]>(environment.apiURL + "/temperature")
       .subscribe((userData) => {
            this.weathers = userData;
            this.weatherUpdated.next([...this.weathers]);
        });
    }

    getWeatherUpdateListener() {
        return this.weatherUpdated.asObservable();
    }
}
