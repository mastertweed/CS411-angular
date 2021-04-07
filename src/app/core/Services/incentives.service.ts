import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

import { Incentives } from "../../Shared/Models/incentives.model";

@Injectable({providedIn: 'root'})
export class IncentivesService {
    // baseURL: string = "http://sp21-cs411-04.cs.illinois.edu:3000/";
    baseURL: string = "http://nodeangular-env.eba-wnqdnhsn.us-east-1.elasticbeanstalk.com/";
    private incentives: Incentives[] = [];
    private incentivesUpdated = new Subject<Incentives[]>();

    constructor(private http: HttpClient) {}

    // getIncentives() {
    //     this.http.get<Incentives[]>('http://localhost:3000/incentives')
    //     //this.http.get<Incentives[]>(environment.apiURL + "/incentives")
    //     .subscribe((userData) => {
    //         this.incentives = userData;
    //         this.incentivesUpdated.next([...this.incentives]);
    //     });
    // }

    getIncentivesUpdateListener() {
        return this.incentivesUpdated.asObservable();
    }

    getIncentives() : Observable<Incentives[]> {
	return this.http.get<Incentives[]>(this.baseURL + "incentives")
    }

    addIncentive(state: string, city:string, des: string, req: string) : Observable<any>{
         const incentive: Incentives = {
             State: state,
             City: city,
             description: des,
             requirements: req,
            }
       const headers = { 'content-type': 'application/json'}
       const body=JSON.stringify(incentive);

       // console.log(body);
       return this.http.post(this.baseURL + "incentives", body,{'headers':headers} );
    }

    deleteIncentive(state: string, city:string) : Observable<any> {
       const query = { del:1, State: state, City: city };
       const headers = { 'content-type': 'application/json'};
       const body=JSON.stringify(query);

       return this.http.post(this.baseURL + "incentives", body, {'headers':headers});
    }

}
