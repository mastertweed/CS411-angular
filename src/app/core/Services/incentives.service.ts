import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Incentives } from "../../Shared/Models/incentives.model";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class IncentivesService {
    baseURL: string = "http://sp21-cs411-04.cs.illinois.edu:3000/";

    private incentives: Incentives[] = [];
    private incentivesUpdated = new Subject<Incentives[]>();

    constructor(private http: HttpClient) {}

    getIncentives() {
        this.http.get<Incentives[]>(environment.apiURL + "/incentives")
        .subscribe((IncentivesData) => {
            this.incentives = IncentivesData;
            this.incentivesUpdated.next([...this.incentives])
        })
    }

    // getIncentives() : Observable<Incentives[]> {
	//     // return this.http.get<Incentives[]>(this.baseURL + "incentives")
    //     return this.http.get<Incentives[]>(environment.apiURL + "/incentives")
    // }

    getIncentivesUpdateListener() {
        return this.incentivesUpdated.asObservable();
    }

    addIncentive(state: string, city: string, des: string, req: string){
        const incentive: Incentives = {
            State: state,
            City: city,
            description: des,
            requirements: req,
        }
            
       const headers = { 'content-type': 'application/json'}
       const body = JSON.stringify(incentive);

        this.http
            .post<{ message: string }>(environment.apiURL + "/incentives", body, {'headers':headers} )
            .subscribe(responseData => {
                console.log(responseData.message);
        });

       this.incentives.push(incentive);
       this.incentivesUpdated.next([...this.incentives]);
    }
 
    deleteIncentive(state: string, city:string) : Observable<any> {
       const query = { mode:1, State: state, City: city };
       const headers = { 'content-type': 'application/json'};
       const body = JSON.stringify(query);

       return this.http.post(environment.apiURL + "/incentives", body, {'headers':headers});
    }
    
    updateIncentive(state: string, city: string, des: string, req: string) : Observable<any> {	
       const query = { mode:2, State: state, City: city, description: des, requirements: req };
       const headers = { 'content-type': 'application/json'};
       const body = JSON.stringify(query);
  
       return this.http.post(environment.apiURL + "/incentives", body, {'headers':headers});

//       this.http.post<Incentives[]>(environment.apiURL + "/incentives", body, {'headers':headers})
//       this.incentives.push(incentive);
//       this.incentivesUpdated.next([...this.incentives]);                  
    }
}
