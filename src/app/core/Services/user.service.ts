import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { User } from "../../Shared/Models/user.model";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class UserService {
    private users: User[] = [];
    private usersUpdated = new Subject<User[]>();


    constructor(private http: HttpClient) {}

    getUsers() {
        this.http.get<User[]>(environment.apiURL + "/user")
        .subscribe((userData) => {
            this.users = userData;
            this.usersUpdated.next([...this.users]);
        });
    }

    getUserUpdateListener() {
        return this.usersUpdated.asObservable();
    }

    addUser(email: number, password: string) {
         const user: User = {
             email: email, 
             password: password
            }
         this.users.push(user);

         this.usersUpdated.next([...this.users])
    }
}