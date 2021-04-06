import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { IncomeTax } from "../../Shared/Models/incometax.model";
import { environment } from "../../../environments/environment";


@Injectable({providedIn: 'root'})
export class IncomeTaxService {
    private incometax: IncomeTax[] = [];
    private incometaxUpdated = new Subject<IncomeTax[]>();

    constructor(private http: HttpClient) {}

    getIncomeTax() {
        this.http.get<IncomeTax[]>(environment.apiURL + "/incometax")
        .subscribe((userData) => {
            this.incometax = userData;
            this.incometaxUpdated.next([...this.incometax]);
        });
    }

    getIncomeTaxUpdateListener() {
        return this.incometaxUpdated.asObservable();
    }
}