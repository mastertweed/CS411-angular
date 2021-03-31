import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { Temperature } from "../../Shared/Models/temperature.model";
import { environment } from "../../../environments/environment";


@Injectable({providedIn: 'root'})
export class TemperatureService {
    private temperature: Temperature[] = [];
    private temperatureUpdated = new Subject<Temperature[]>();

    constructor(private http: HttpClient) {}

    getTemperature() {
        this.http.get<Temperature[]>(environment.apiURL + "/temperature")
        .subscribe((userData) => {
            this.temperature = userData;
            this.temperatureUpdated.next([...this.temperature]);
        });
    }

    getTemperatureUpdateListener() {
        return this.temperatureUpdated.asObservable();
    }
}