import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { environment } from "../../../environments/environment";
import { UserPreference } from "../../Shared/Models/userpreference.model";
import { Router, UrlSerializer } from "@angular/router";


@Injectable({providedIn: 'root'})
export class UserPreferenceSerivce {
    private userpreferences: UserPreference[] = [];
    private userpreferencesUpdated = new Subject<UserPreference[]>();

    private userpreference: UserPreference;
    private userpreferenceUpdated = new Subject<UserPreference>();

    constructor(private http: HttpClient, private router: Router, private serializer: UrlSerializer) {}

    // Get all preferences
    getUserPreference() {
        this.http.get<UserPreference[]>(environment.apiURL + '/userpreference')
        .subscribe((userData) => {
            this.userpreferences = userData;
            this.userpreferencesUpdated.next([...this.userpreferences]);
        });
    }

    getUserPreferencesUpdateListener() {
        return this.userpreferencesUpdated.asObservable();
    }

    // Get single preference
    getUserPreferenceByEmail(email: string) {
        this.http.get<UserPreference>(environment.apiURL + '/userpreference/' + email)
        .subscribe((userData) => {
            this.userpreference = userData;
            this.userpreferenceUpdated.next(this.userpreference);
        });
    }

    getUserPreferenceUpdateListener() {
        return this.userpreferenceUpdated.asObservable();
    }

    updateUserPreferenceByEmail(email: string, max_distance: number, 
        zipcode: string, min_cost: number, max_cost: number, bedrooms1: number, 
        bedrooms2: number, bedrooms3: number, bedrooms4: number, bedrooms5: number, 
        singlefamily: number, min_temp: number, max_temp: number) {

        const tree = this.router.createUrlTree(['/userpreference/update'], { queryParams: 
            { 
                email: email,
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

        console.log(environment.apiURL + this.serializer.serialize(tree))

        this.http.get<{ message: string }>(environment.apiURL + this.serializer.serialize(tree))
            .subscribe(responseData => {
                console.log(responseData.message);
            });
    }

    createUserPreferenceByEmail(email: string, max_distance: number, 
        zipcode: string, min_cost: number, max_cost: number, bedrooms1: number, 
        bedrooms2: number, bedrooms3: number, bedrooms4: number, bedrooms5: number, 
        singlefamily: number, min_temp: number, max_temp: number) {

        console.log('create user preference')

        const tree = this.router.createUrlTree(['/userpreference/create'], { queryParams: 
            { 
            email: email,
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

        console.log(environment.apiURL + this.serializer.serialize(tree))

        this.http.get<{ message: string }>(environment.apiURL + this.serializer.serialize(tree))
            .subscribe(responseData => {
                console.log(responseData.message);
            });
    }
}