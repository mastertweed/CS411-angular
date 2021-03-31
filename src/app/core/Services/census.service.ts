import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { Census } from "../../Shared/Models/census.model";
import { environment } from "../../../environments/environment";


@Injectable({providedIn: 'root'})
export class CensusService {
    private census: Census[] = [];
    private censusUpdated = new Subject<Census[]>();

    constructor(private http: HttpClient) {}

    getCensus() {
        this.http.get<Census[]>(environment.apiURL + "/census")
        .subscribe((userData) => {
            this.census = userData;
            this.censusUpdated.next([...this.census]);
        });
    }

    getCensusUpdateListener() {
        return this.censusUpdated.asObservable();
    }
}