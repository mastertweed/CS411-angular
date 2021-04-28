import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Router, UrlSerializer } from "@angular/router";

import { User } from "../../Shared/Models/user.model";
import { environment } from "../../../environments/environment";


@Injectable({providedIn: 'root'})
export class UserService {
    private users: User[] = [];
    private usersUpdated = new Subject<User[]>();

    private currentUser: User;
    private currentUserUpdated = new Subject<User>();

    constructor(private http: HttpClient,  private router: Router, private serializer: UrlSerializer) {}

    getCurrentUser() {
        return this.currentUser
    }

    getUsers() {
        this.http.get<User[]>(environment.apiURL + "/users")
        .subscribe((userData) => {
            this.users = userData;
            this.usersUpdated.next([...this.users]);
        });
    }

    getUserUpdateListener() {
        return this.usersUpdated.asObservable();
    }

    getUserByEmail(email: string) {

        console.log(environment.apiURL + "/users/" + email);
        this.http.get<User[]>(environment.apiURL + "/users/" + email)
            .subscribe((user) => {
                console.log(user[0]);
                this.currentUser = user[0];
                this.currentUserUpdated.next(this.currentUser);
            });
    }

    getCurrentUserUpdateListener() {
        return this.currentUserUpdated.asObservable();
    }

    addUser(email: string, password: string) {
        const user: User = {
            email: email, 
            password: password
        }

        this.http.post<{message: string}>(environment.apiURL + "/users", user)
        .subscribe(response => {
            console.log(response.message);

            // Add new user to list
            this.users.push(user);
            this.usersUpdated.next([...this.users])

            // Save new user as current user
            this.currentUser = user;
            this.currentUserUpdated.next(this.currentUser)
        });
    }

}
