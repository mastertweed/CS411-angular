import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { States } from "../../Shared/Models/states.model";
import { environment } from "../../../environments/environment";


@Injectable({providedIn: 'root'})
export class StatesService {
    private states: States[] = [];
    private statesUpdated = new Subject<States[]>();

    constructor(private http: HttpClient) {}

    getStates() {
        this.http.get<States[]>(environment.apiURL + "/states")
        .subscribe((userData) => {
            this.states = userData;
            this.statesUpdated.next([...this.states]);
        });
    }

    getStatesUpdateListener() {
        return this.statesUpdated.asObservable();
    }
}