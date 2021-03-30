import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { City } from "../../Shared/Models/city.model";
import { environment } from "../../../environments/environment";


@Injectable({providedIn: 'root'})
export class CityService {
    private citys: City[] = [];
    private citysUpdated = new Subject<City[]>();

    constructor(private http: HttpClient) {}

    getUsers() {
        this.http.get<City[]>(environment.apiURL + "/city")
        .subscribe((userData) => {
            this.citys = userData;
            this.citysUpdated.next([...this.citys]);
        });
    }

    getUserUpdateListener() {
        return this.citysUpdated.asObservable();
    }
}