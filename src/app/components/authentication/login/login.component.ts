import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { Subscription } from "rxjs";

import { UserInfoService } from 'src/app/core/Services/user_info.service';
import { UserInfo } from "../../../Shared/Models/userinfo.model";

import { UserService } from "../../../core/Services/user.service";
import { User } from "../../../Shared/Models/user.model";
import { AuthenticationService } from "../authentication.service";
import { UserPreferenceSerivce } from 'src/app/core/Services/userpreference.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  login = false;

  loginEmail = "";
  loginPassword = "";
  signupEmail = "";
  signupPassword = "";

  user: User = {
    email: "some", 
    password: "some"
}

  currentUser: User;
  private currentUserSub: Subscription;

  authToken: string;
  private authTokenSub: Subscription;

  constructor(private router: Router, 
    private userService: UserService, 
    private userpreferenceService: UserPreferenceSerivce,
    private authenticationService: AuthenticationService,
    private userinfoService: UserInfoService) {}

  ngOnInit(): void {
    this.currentUserSub = this.userService.getCurrentUserUpdateListener()
    .subscribe((user: User) => {
        this.currentUser = user;

        if (!this.login) {
          this.userinfoService.addUserInfo(this.currentUser.email,"","","","","");

          // Attempt to add user to the database
          this.userpreferenceService.createUserPreferenceByEmail(this.currentUser.email, 0, "19104", 1000000, 0, 0, 0, 0, 0, 0, 0, -100, 100)

          // Navigate to the preference page
          this.router.navigate(['/userinfo']);
          
        } else {

          // Navigate to the preference page
          this.router.navigate(['/preference']);
        }
    });

    this.authTokenSub = this.authenticationService.loginUpdatedListener()
    .subscribe((authToken) => {
      this.authToken = authToken;
      
      if (this.login) {
        console.log("Validating login and pulling info")

        // Get user data after verfification
        this.userService.getUserByEmail(this.loginEmail)

      } else {
        console.log("Validating signup and pulling info")

        // Get user data after verfification
        this.userService.getUserByEmail(this.signupEmail)
      }

    });

  }

  onSubmitLogin(form: NgForm) {
    console.log("Submitted login")
    if (form.invalid) {
      return;
    }
    this.login = true;
    this.loginEmail = form.value.loginEmail
    this.loginPassword = form.value.loginPassword

    // Verify email and password exist in database, and recieve auth token
    this.authenticationService.login(this.loginEmail, this.loginPassword)
  }

  onSubmitSignup(form: NgForm) {
    console.log("Submitted signup")
    if (form.invalid) {
      return;
    }
    this.login = false;
    this.signupEmail = form.value.signupEmail
    this.signupPassword = form.value.signupPassword

    // Attempt to add user to the database
    this.userService.addUser(this.signupEmail,this.signupPassword)
    
    // Verify email and password exist in database, and recieve auth token
    this.authenticationService.login(this.signupEmail, this.signupPassword)

  }

  onGuestClick() {
    this.router.navigate(['/preference']);
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
    this.authTokenSub.unsubscribe();
  }
  

}
