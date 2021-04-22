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
    this.authenticationService.login(this.loginEmail, this.loginPassword)

    // this.userService.getUserByEmail(this.loginEmail)

    // this.user = this.userService.getCurrentUser()

    // this.router.navigate(['/preference']);
  }

  onSubmitSignup(form: NgForm) {
    console.log("Submitted signup")
    if (form.invalid) {
      return;
    }
    this.signupEmail = form.value.signupEmail
    this.signupPassword = form.value.signupPassword

    this.userService.addUser(this.signupEmail,this.signupPassword)

    this.user = this.userService.getCurrentUser()

    this.router.navigate(['/user-info']);
  }

  onGuestClick() {
    this.router.navigate(['/preference']);
  }
  

}
