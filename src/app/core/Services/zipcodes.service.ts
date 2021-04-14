import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { ZipCodes } from "../../Shared/Models/zipcodes.model";
import { environment } from "../../../environments/environment";


@Injectable({providedIn: 'root'})
export class ZipCodesService {
    private allzipcodes: ZipCodes[] = [];
    private allzipcodesUpdated = new Subject<ZipCodes[]>();

    private zipcodes: ZipCodes[] = [];
    private zipcodesUpdated = new Subject<ZipCodes[]>();

    constructor(private http: HttpClient) {}

    getZipCodes() {
        this.http.get<ZipCodes[]>(environment.apiURL + "/zipcodes")
        .subscribe((userData) => {
            this.allzipcodes = userData;
            this.allzipcodesUpdated.next([...this.allzipcodes]);
        });
    }

    getZipCodesUpdateListener() {
        return this.allzipcodesUpdated.asObservable();
    }

    getZipCodesByZip(zip: number) {
        this.http.get<ZipCodes[]>(environment.apiURL + "/zipcodes/" + zip)
        .subscribe((userData) => {
            this.zipcodes = userData;
            this.zipcodesUpdated.next([...this.zipcodes]);
        });
    }

    getZipCodesByZipUpdateListener() {
        return this.zipcodesUpdated.asObservable();
    }

}
