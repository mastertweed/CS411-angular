import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';

import { UserService } from "../../../core/Services/user.service";
import { User } from "../../../Shared/Models/user.model";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signup = 0

  loginEmail = "";
  loginPassword = "";
  signupEmail = "";
  signupPassword = "";

  user: User = {
    email: "some", 
    password: "some"
}

  constructor(private router: Router, 
    private userService: UserService, 
    private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser()
  }

  onSubmitLogin(form: NgForm) {
    console.log("Submitted login")
    if (form.invalid) {
      return;
    }
    this.loginEmail = form.value.loginEmail
    this.loginPassword = form.value.loginPassword

    console.log(this.loginEmail);

    // Verify email and password exist in database, and recieve auth token
    this.authenticationService.login(this.loginEmail, this.loginPassword)

    // Get user data after verfification
    this.userService.getUserByEmail(this.loginEmail)

    // Save user locally
    this.user = this.userService.getCurrentUser()

    // Navigate to the preference page
    this.router.navigate(['/preference']);
  }

  onSubmitSignup(form: NgForm) {
    console.log("Submitted signup")
    if (form.invalid) {
      return;
    }
    this.signupEmail = form.value.signupEmail
    this.signupPassword = form.value.signupPassword

    // Attempt to add user to the database
    this.userService.addUser(this.signupEmail,this.signupPassword)
    
    // Verify email and password exist in database, and recieve auth token
    this.authenticationService.login(this.signupEmail, this.signupPassword)

    // Save user locally
    this.user = this.userService.getCurrentUser()

    // Navigate to the user-info page
    this.router.navigate(['/user-info']);
  }

  onGuestClick() {
    this.router.navigate(['/preference']);
  }
  

}
