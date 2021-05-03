import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Router, UrlSerializer } from "@angular/router";

import { UserPreference } from "../../Shared/Models/userpreference.model";
import { Results } from "../../Shared/Models/results.model";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class PreferenceService {
    private preference: UserPreference[] = [];
    private preferenceUpdated = new Subject<UserPreference[]>();

    private results: Results[] = [];
    private resultsUpdated = new Subject<Results[]>();


    constructor(private http: HttpClient, private router: Router, private serializer: UrlSerializer) {}

    getPreference() {
        this.http.get<UserPreference[]>(environment.apiURL + "/preference")
        .subscribe((preferenceData) => {
            this.preference = preferenceData;
            this.preferenceUpdated.next([...this.preference]);
        });
    }

    getPreferenceUpdateListener() {
        return this.preferenceUpdated.asObservable();
    }

    // addPreference(email: string, max_distance: number, min_cost_living: number, max_cost_living: number, 
    //     average_age: number, bedrooms1: boolean, bedrooms2: boolean, bedrooms3: boolean, bedrooms4: boolean, 
    //     bedrooms5: boolean, singlefamily: boolean, min_temp: number, max_temp: number) {
    //     const preference: UserPreference = {
    //         email: email, 
    //         max_distance: max_distance, 
    //         min_cost_living: min_cost_living, 
    //         max_cost_living: max_cost_living, 
    //         average_age: average_age, 
    //         bedrooms1: bedrooms1, 
    //         bedrooms2: bedrooms2, 
    //         bedrooms3: bedrooms3, 
    //         bedrooms4: bedrooms4, 
    //         bedrooms5: bedrooms5, 
    //         singlefamily: singlefamily, 
    //         min_temp: min_temp, 
    //         max_temp: max_temp
    //         }
    //     this.http
    //         .post<{ message: string }>(environment.apiURL + "/preference", preference)
    //         .subscribe(responseData => {
    //             console.log(responseData.message);
    //         });
        
    //     this.preference.push(preference);
    //     this.preferenceUpdated.next([...this.preference])
    // }


    getPreferenceResults(max_distance: number, zip_code: number, min_cost_living: number, max_cost_living: number, 
        average_age: number, bedrooms1: number, bedrooms2: number, bedrooms3: number, bedrooms4: number, 
        bedrooms5: number, singlefamily: number, min_temp: number, max_temp: number) {

        const tree = this.router.createUrlTree(["preference/results"], { queryParams: 
            { 
            max_distance: max_distance, 
	    zipcode: zip_code,
            minprice: min_cost_living, 
            maxprice: max_cost_living, 
            // average_age: average_age, 
            onebed: bedrooms1, 
            twobed: bedrooms2, 
            threebed: bedrooms3, 
            fourbed: bedrooms4, 
            fiveplusbed: bedrooms5, 
            singlefamily: singlefamily, 
            mintemp: min_temp, 
            maxtemp: max_temp
            } 
        });

        this.http.get<Results[]>(environment.apiURL + this.serializer.serialize(tree))
            .subscribe(resultsData => {
                this.results = resultsData;
                this.resultsUpdated.next([...this.results]);
            });
    }

    getResultsUpdateListener() {
        return this.resultsUpdated.asObservable();
    }

    getResults() {
        console.log(this.results[0])
        return this.results
    }
}
