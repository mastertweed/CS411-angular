import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { ZipCodes } from "../../Shared/Models/zipcodes.model";
import { environment } from "../../../environments/environment";


@Injectable({providedIn: 'root'})
export class ZipCodesService {
    private zipcodes: ZipCodes[] = [];
    private zipcodesUpdated = new Subject<ZipCodes[]>();

    constructor(private http: HttpClient) {}

    getZipCodes() {
        this.http.get<ZipCodes[]>(environment.apiURL + "/zipcodes")
        .subscribe((userData) => {
            this.zipcodes = userData;
            this.zipcodesUpdated.next([...this.zipcodes]);
        });
    }

    getZipCodesUpdateListener() {
        return this.zipcodesUpdated.asObservable();
    }
}