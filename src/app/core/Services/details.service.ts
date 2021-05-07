import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { environment } from "../../../environments/environment";
import { Router, UrlSerializer } from "@angular/router";

@Injectable({providedIn: 'root'})
export class DetailsService {

    private details = [];
    private detailsUpdated = new Subject<any[]>();

    constructor(private http: HttpClient, private router: Router, private serializer: UrlSerializer) {}

    // getDetails(triple) {

    //     this.details = [];

    //     for (let i = 0; i < triple.length; i++) {
    //         const tree = this.router.createUrlTree(["details"], { queryParams: 
    //             { 
    //                 city: triple[i].city, 
    //                 state: triple[i].state,
    //                 county: triple[i].state, 
    //             } 
    //         });
    
    //         this.http.get<any[]>(environment.apiURL + this.serializer.serialize(tree))
    //             .subscribe(detailsData => {
    //                 this.details.push(detailsData);
    //                 this.detailsUpdated.next([...this.details]);
    //             });
    //     }
    // }

    getDetailsSingle(city: string, state: string, county: string) {

        const tree = this.router.createUrlTree(["details"], { queryParams: 
            { 
                city: city, 
                state: state,
                county: state, 
            } 
        });

        this.http.get<any[]>(environment.apiURL + this.serializer.serialize(tree))
            .subscribe(detailsData => {
                this.details = detailsData;
                this.detailsUpdated.next([...this.details]);
            });

    }

    getDetailsUpdateListener() {
        return this.detailsUpdated.asObservable();
    }
}