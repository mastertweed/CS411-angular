import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitLogin(form: NgForm) {
    console.log("Submitted login")
    if (form.invalid) {
      return;
    }
    this.loginEmail = form.value.loginEmail
    this.loginPassword = form.value.loginPassword
  }

  onSubmitSignup(form: NgForm) {
    console.log("Submitted signup")
    if (form.invalid) {
      return;
    }
    this.signupEmail = form.value.signupEmail
    this.signupPassword = form.value.signupPassword
  }
  

}
