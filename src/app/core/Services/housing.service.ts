import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { Housing } from "../../Shared/Models/housing.model";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class HousingService {
    baseURL: string = "http://sp21-cs411-04.cs.illinois.edu:3000/";
    private housings: Housing[] = [];
    private housingUpdated = new Subject<Housing[]>();

    constructor(private http: HttpClient) {}

    getHousing() {
//	return this.http.get<Housing[]>(this.baseURL + "singlefamilyresidenceprice")
        this.http.get<Housing[]>(environment.apiURL + "/singlefamilyresidenceprice")
       .subscribe((userData) => {
            this.housings = userData;
            this.housingUpdated.next([...this.housings]);
        });
    }

    getHousingUpdateListener() {
        return this.housingUpdated.asObservable();
    }
}
