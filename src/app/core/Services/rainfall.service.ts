import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { Rainfall } from "../../Shared/Models/rainfall.model";
import { environment } from "../../../environments/environment";


@Injectable({providedIn: 'root'})
export class RainfallService {
    private rainfall: Rainfall[] = [];
    private rainfallUpdated = new Subject<Rainfall[]>();

    constructor(private http: HttpClient) {}

    getRainfall() {
        this.http.get<Rainfall[]>(environment.apiURL + "/rainfall")
        .subscribe((userData) => {
            this.rainfall = userData;
            this.rainfallUpdated.next([...this.rainfall]);
        });
    }

    getRainfallUpdateListener() {
        return this.rainfallUpdated.asObservable();
    }
}