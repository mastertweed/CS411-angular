import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { environment } from "../../../environments/environment";
import { UserPreference } from "../../Shared/Models/userpreference.model";
import { Router, UrlSerializer } from "@angular/router";


@Injectable({providedIn: 'root'})
export class UserPreferenceSerivce {
    private userpreference: UserPreference[] = [];
    private userpreferenceUpdated = new Subject<UserPreference[]>();

    constructor(private http: HttpClient, private router: Router, private serializer: UrlSerializer) {}

    getUserPreference() {
        this.http.get<UserPreference[]>(environment.apiURL + '/prefers')
        .subscribe((userData) => {
            this.userpreference = userData;
            this.userpreferenceUpdated.next([...this.userpreference]);
        });
    }

    getUserPreferenceUpdateListener() {
        return this.userpreferenceUpdated.asObservable();
    }

    updateUserPreferenceByEmail(email: string, max_distance: number, 
        zipcode: string, min_cost: number, max_cost: number, bedrooms1: number, 
        bedrooms2: number, bedrooms3: number, bedrooms4: number, bedrooms5: number, 
        singlefamily: number, min_temp: number, max_temp: number) {

        const tree = this.router.createUrlTree(['/prefers/udpate/' + email], { queryParams: 
            { 
            max_distance: max_distance, 
	        zipcode: zipcode,
            min_cost: min_cost, 
            max_cost: max_cost, 
            bedrooms1: bedrooms1, 
            bedrooms2: bedrooms2, 
            bedrooms3: bedrooms3, 
            bedrooms4: bedrooms4, 
            bedrooms5: bedrooms5, 
            singlefamily: singlefamily, 
            min_temp: min_temp, 
            max_temp: max_temp
            } 
        });

        this.http.get<String>(environment.apiURL + this.serializer.serialize(tree))
            .subscribe(resultsData => {
                console.log(resultsData)
                this.getUserPreference()
            });
    }

    createUserPreferenceByEmail(email: string, max_distance: number, 
        zipcode: string, min_cost: number, max_cost: number, bedrooms1: number, 
        bedrooms2: number, bedrooms3: number, bedrooms4: number, bedrooms5: number, 
        singlefamily: number, min_temp: number, max_temp: number) {

        const tree = this.router.createUrlTree(['/prefers/create/' + email], { queryParams: 
            { 
            max_distance: max_distance, 
	        zipcode: zipcode,
            min_cost: min_cost, 
            max_cost: max_cost, 
            bedrooms1: bedrooms1, 
            bedrooms2: bedrooms2, 
            bedrooms3: bedrooms3, 
            bedrooms4: bedrooms4, 
            bedrooms5: bedrooms5, 
            singlefamily: singlefamily, 
            min_temp: min_temp, 
            max_temp: max_temp
            } 
        });

        this.http.get<String>(environment.apiURL + this.serializer.serialize(tree))
            .subscribe(resultsData => {
                console.log(resultsData)
                this.getUserPreference()
            });
    }
}