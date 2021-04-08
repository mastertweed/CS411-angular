import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { UserInfo } from "../../Shared/Models/userinfo.model";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class UserInfoService {
    private userinfo: UserInfo[] = [];
    private userinfoUpdated = new Subject<UserInfo[]>();


    constructor(private http: HttpClient) {}

    getUserInfo() {
        this.http.get<UserInfo[]>(environment.apiURL + "/userinfo")
        .subscribe((userinfoData) => {
            this.userinfo = userinfoData;
            this.userinfoUpdated.next([...this.userinfo]);
        });
    }

    getUserInfoUpdateListener() {
        return this.userinfoUpdated.asObservable();
    }

    addUserInfo(email: string, firstname: string, lastname: string, city: string, state: string, zipcode: string) {
        const userinfo: UserInfo = {
             email: email, 
             firstname: firstname,
             lastname: lastname,
             city: city,
             state: state,
             zipcode: zipcode
            }
        this.http
            .post<{ message: string }>(environment.apiURL + "/userinfo", userinfo)
            .subscribe(responseData => {
                console.log(responseData.message);
            });
        
        this.userinfo.push(userinfo);
        this.userinfoUpdated.next([...this.userinfo])
    }
}
