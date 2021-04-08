import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { Census } from "../../Shared/Models/census.model";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class CensusService {
    baseURL: string = "http://sp21-cs411-04.cs.illinois.edu:3000/";
    private censuses: Census[] = [];
    private censusUpdated = new Subject<Census[]>();

    constructor(private http: HttpClient) {}

    getCensus() {
        this.http.get<Census[]>(environment.apiURL + "/census")
       .subscribe((userData) => {
            this.censuses = userData;
            this.censusUpdated.next([...this.censuses]);
        });
    }

    getCensusUpdateListener() {
        return this.censusUpdated.asObservable();
    }
}
