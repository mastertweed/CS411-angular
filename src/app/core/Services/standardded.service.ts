import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { StandardDed } from "../../Shared/Models/standardded.model";
import { environment } from "../../../environments/environment";


@Injectable({providedIn: 'root'})
export class StandardDedService {
    private standardded: StandardDed[] = [];
    private standarddedUpdated = new Subject<StandardDed[]>();

    constructor(private http: HttpClient) {}

    getStandardDed() {
        this.http.get<StandardDed[]>(environment.apiURL + "/standardded")
        .subscribe((userData) => {
            this.standardded = userData;
            this.standarddedUpdated.next([...this.standardded]);
        });
    }

    getStandardDedUpdateListener() {
        return this.standarddedUpdated.asObservable();
    }
}