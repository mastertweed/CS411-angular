import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Results } from "../../Shared/Models/results.model";


@Injectable({providedIn: 'root'})
export class ResultsService {
    private result: Results;
    private resultUpdated = new Subject<Results>();

    constructor() {}

    setCurrentResult(result: Results) {
        this.result = result
        this.resultUpdated.next(this.result);
    }

    getCurrentResult() {
        return this.result
    }

    getCurrentResultUpdateListener() {
        return this.resultUpdated.asObservable();
    }
}