import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { UserInfo } from "../../Shared/Models/userinfo.model";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class UserInfoService {
    private usersinfo: UserInfo[] = [];
    private usersinfoUpdated = new Subject<UserInfo[]>();

    private userinfo: UserInfo;
    private userinfoUpdated = new Subject<UserInfo>();


    constructor(private http: HttpClient) {}

    // All users info
    getUserInfo() {
        this.http.get<UserInfo[]>(environment.apiURL + "/userinfo")
        .subscribe((usersinfoData) => {
            this.usersinfo = usersinfoData;
            this.usersinfoUpdated.next([...this.usersinfo]);
        });
    }

    getUserInfoUpdateListener() {
        return this.usersinfoUpdated.asObservable();
    }

    // Single user info
    getUserInfoByEmail(email: string) {
        this.http.get<UserInfo>(environment.apiURL + "/userinfo/" + email)
        .subscribe((userinfoData) => {
            this.userinfo = userinfoData;
            this.userinfoUpdated.next(this.userinfo);
        });
    }

    getUserInfoEmailUpdateListener() {
        return this.userinfoUpdated.asObservable();
    }

    addUserInfo(email: string, firstname: string, lastname: string, 
        city: string, state: string, zipcode: string) {

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
                this.usersinfo.push(userinfo);
                this.usersinfoUpdated.next([...this.usersinfo])
            });
        
    }

    updateUserInfo(email: string, firstname: string, lastname: string, 
        city: string, state: string, zipcode: string) {

        console.log("Add new user-info service")

        const userinfoNoEmail = {
             firstname: firstname,
             lastname: lastname,
             city: city,
             state: state,
             zipcode: zipcode
            }

        const userinfo = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            city: city,
            state: state,
            zipcode: zipcode
           }

        this.http
            .post<{ message: string }>(environment.apiURL + "/userinfo/" + email, userinfoNoEmail)
            .subscribe(responseData => {
                console.log(responseData.message);
                this.usersinfo.push(userinfo);
                this.usersinfoUpdated.next([...this.usersinfo])
            });
        
    }

    
}
