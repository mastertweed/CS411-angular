import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router, UrlSerializer } from "@angular/router";

import { User } from "../../Shared/Models/user.model";
import { environment } from "../../../environments/environment";

import { UserService } from "../../core/Services/user.service";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

    private authToken: string;

    constructor(private http: HttpClient, private router: Router, private serializer: UrlSerializer, private userSevice: UserService) {}

    login(email: string, password: string) {

        const tree = this.router.createUrlTree(["login"], { queryParams: 
            { 
            email: email, 
            password: password
            } 
        });


        this.http.get<{accessToken: string}>(environment.apiURL + this.serializer.serialize(tree))
            .subscribe(response => {
                console.log(response);
                this.authToken = response.accessToken
        });
    }

    getToken() {
        return this.authToken
    }

}
